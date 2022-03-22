function CScenario() {
    var _oWorld;
    
    var _oOriginPoint;
    var _oBallMaterial;
    var _oWallMaterial;

    var _aBalls;
    
    var oFieldBody;

    var iRot = 0;

    var _iTimeStep;

    var GROUP1 = 1;
    var GROUP2 = 2;


    if (SHOW_3D_RENDER){
        var _oDemo = new CANNON.Demo();
    }

    this.getDemo = function(){
        return _oDemo;
    };

    this._init = function () {
        _iTimeStep = 1/60;        

        if (SHOW_3D_RENDER) {
            _oWorld = _oDemo.getWorld();
        } else {
            _oWorld = new CANNON.World();
        }

        _oOriginPoint = new CANNON.Vec3(0,0,0);

        _oWorld.gravity.set(0,WORLD_GRAVITY, 0);
        //_oWorld.gravity.set(0, 0, 0);
        
        _oWorld.broadphase = new CANNON.NaiveBroadphase();
        _oWorld.solver.iterations = 10;


        _oBallMaterial = new CANNON.Material();
        _oWallMaterial = new CANNON.Material();

        
        
        var ball_edge_cm = new CANNON.ContactMaterial(
                _oBallMaterial, _oWallMaterial, {
                    friction: 0.6,
                    restitution: 0.5,
                    contactEquationStiffness: 1e8,
                    contactEquationRelaxation: 3,
                    frictionEquationStiffness: 1e8,
                    frictionEquationRegularizationTime: 3
                });

        _oWorld.addContactMaterial(ball_edge_cm);


//           model FBX
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        var onProgress = function (xhr) { 
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                //console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };
        
        var onError = function (xhr) {
        };

        var loader = new THREE.FBXLoader(manager);
        var oParent = this;

        loader.load('models/sphere_machine.txt', function (objects) {
        
            
            s_oScenario.parseFile(objects);
            s_oGame.scenarioLoaded();
            objects = null;
            

            
        }, onProgress, onError);
    };

    this.parseFile = function (oFile) {
        //console.log(oFile);
        for (var i = 0; i < oFile.children.length; i++) {
            var oMesh = oFile.children[i];

            console.log("oMesh.name: " + oMesh.name);
            
            
            if (oMesh.name === "GeoSphere") {
                s_oScenario._createFieldBody(oMesh);
            }

            _aBalls = new Array();
            
            
            var iStartXPos = -35;
            for(var i=0; i<8; i++){
                BALLS_START_POSITION.push( {x: iStartXPos + i*BALL_RADIUS*2, y: 0, z: 0} );
            }

            for(var i=0; i<8; i++){
                BALLS_START_POSITION.push( {x: iStartXPos + i*BALL_RADIUS*2, y: 0, z: BALL_RADIUS*2} );
            }

            for(var i=0; i<8; i++){
                BALLS_START_POSITION.push( {x: iStartXPos + i*BALL_RADIUS*2, y: 0, z: -BALL_RADIUS*2} );
            }

            for(var i=0; i<8; i++){
                BALLS_START_POSITION.push( {x: iStartXPos + i*BALL_RADIUS*2, y: BALL_RADIUS*2, z: 0} );
            }

            for(var i=0; i<8; i++){
                BALLS_START_POSITION.push( {x: iStartXPos + i*BALL_RADIUS*2, y: -BALL_RADIUS*2, z: 0} );
            }
            
            var aRandomStartPosition = s_oScenario.getRandomStartPositions();
            for(var i=0; i<TOTAL_NUMBERS; i++){
                s_oScenario._createBallBody(aRandomStartPosition[i]);
            }
        }

    };

    this._createFieldBody = function (oMesh) {
        var oFieldMesh = this.__extractMeshData(oMesh);
        // Add to compound
        oFieldBody = new CANNON.Body({mass: 0, material: _oWallMaterial/*, collisionFilterGroup:GROUP2*/});
        oFieldBody.addShape(oFieldMesh);

        var v3IniPos = new CANNON.Vec3(oMesh.position.x, oMesh.position.y, oMesh.position.z);
        oFieldBody.position.copy(v3IniPos);

        // Create bodys
        _oWorld.addBody(oFieldBody);

        if (SHOW_3D_RENDER)
            _oDemo.addVisual(oFieldBody, 0xc5f0ed);
    };

    this._createBallBody = function (oPosition) {
        var oBallShape = new CANNON.Sphere(BALL_RADIUS);
        var oBallBody = new CANNON.Body({mass: BALL_MASS, material: _oBallMaterial, linearDamping: BALL_LINEAR_DAMPING,
            angularDamping: 0.59/*, collisionFilterGroup:GROUP1, collisionFilterMask:GROUP2*/});

        var v3IniPos = new CANNON.Vec3(oPosition.x, oPosition.y, oPosition.z);
        oBallBody.position.copy(v3IniPos);
        oBallBody.previousPosition.copy(v3IniPos);

        oBallBody.addShape(oBallShape);
        _oWorld.add(oBallBody);
        if (SHOW_3D_RENDER){
            var oBallMesh = _oDemo.addVisual(oBallBody);
        }
            
        _aBalls.push(oBallBody);

    };

    this.__extractMeshData = function (oMesh) {

        var oGeometry = (new THREE.Geometry()).fromBufferGeometry(oMesh.geometry);

        var aRawFaces = oGeometry.faces;
        var aRawVerts = oGeometry.vertices;
        var aOnlyFaceCoord = new Array();

        for (var i = 0; i < aRawFaces.length; i++) {
            aOnlyFaceCoord[i] = {a: aRawFaces[i].a, b: aRawFaces[i].b, c: aRawFaces[i].c};
        }

        var verts = [], faces = [];
        var fScale = 1;
        // Get vertices
        for (var i = 0; i < aRawVerts.length; i++) {
            verts.push(aRawVerts[i].x * fScale);
            verts.push(aRawVerts[i].y * fScale);
            verts.push(aRawVerts[i].z * fScale);
        }
        // Get faces
        for (var i = 0; i < aRawFaces.length; i++) {
            faces.push(aRawFaces[i].a);
            faces.push(aRawFaces[i].b);
            faces.push(aRawFaces[i].c);
        }
        // Construct polyhedron
        return new CANNON.Trimesh(verts, faces);
    };

    this.addImpulse = function (iIndex, oVec3) {
        var iStrength = SHUFFLE_IMPULSE_STRENGTH
        var iX = (-1 +2*Math.random()) * iStrength;
        var iY = iStrength;
        var iZ = (-1 +2*Math.random()) * iStrength;
        
        var v3Impulse = new CANNON.Vec3(iX, iY, iZ);

        _aBalls[iIndex].applyImpulse(v3Impulse, _aBalls[iIndex].position);
    };

    this.addLocalImpulse = function (iIndex, oVec3) {
        var iStrength = SHUFFLE_IMPULSE_STRENGTH;
        var iX = (-1 +2*Math.random()) * iStrength;
        var iY = iStrength;
        var iZ = (-1 +2*Math.random()) * iStrength;
        
        var v3Impulse = new CANNON.Vec3(iX, iY, iZ);

        _aBalls[iIndex].applyImpulse(v3Impulse, _aBalls[iIndex].position);
    };

    this.update = function () {
        _oWorld.step(_iTimeStep);
    };
   
    this.getWorld = function(){
        return _oWorld;
    };

    this.getBalls = function(){
        return _aBalls;
    };
    
    this.getRandomStartPositions = function(){
        var aCopiedPositions = new Array();
        for(var i=0; i<BALLS_START_POSITION.length; i++){
            aCopiedPositions.push(BALLS_START_POSITION[i]);
        }
        
        return shuffle(aCopiedPositions);
    };

    s_oScenario = this;

    if (SHOW_3D_RENDER) {
        _oDemo.addScene("Test", this._init);
        _oDemo.start();
    } else {
        this._init();
    }
}

var s_oScenario;


