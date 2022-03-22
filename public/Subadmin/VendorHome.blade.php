<header>
    <div class="topbar-left">
        <button class="menu-bar" ng-click="toggleMenu()"><i class="fas fa-bars"></i></button>
        <p class="logo">
            <i class="fas fa-angle-left"></i><i class="fas fa-angle-left"></i>
            <span> Billionaire</span> <i class="fas fa-angle-right"></i><i class="fas fa-angle-right"></i>
        </p>
        <p>Reports</p>
    </div>
    <div class="topbar-right">
        <div class="logindetails">
            You logged in as
        </div>
        <div class="user">
            <div style=" margin-right:50px"> <%uname%></div>
        </div>
        <i class="fas fa-sort-down"></i>
    </div>
</header>
<div class="main-wrapper">
    <div class="sidebar" ng-style="myStyle">
        <div class="close" ng-click="toggleMenu()">
            <button><i class="fas fa-times"></i></button>
        </div>
        <div class="sidebar-top shadow">
            Your Balance: <b> $<%c.amount%> usd</b>
        </div>
        <div class="sidebar-bottom shadow">
            <ul>
                <li>
                    <a href="#!">
                        <i class="fas fa-plus"></i>
                        <span>Accounts Management</span>
                    </a>
                </li>
                <!-- <li>
                    <a href="#!accounthistory">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Account history</span>
                    </a>
                </li> -->
                <li>
                    <a href="#!transctionhistory">
                        <i class="fas fa-search"></i>
                        <span>Transactions history</span>
                    </a>
                </li>
                <!-- <li>
                    <a href="#!accountdispute">
                        <i class="fas fa-envelope"></i>
                        <span>Dispute</span>
                    </a>
                </li> -->
                <hr />
                <li>
                    <a title="Logout" style=" margin-right:30px" href="logoutselfv" style="font-size:15px; color:black; float:right; margin-right: 60px">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>
                            Logout
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="content">
        <div class="message" style="background: lightblue;color:red;font-size:20px;"><b><%alertmessage%></b>
        </div>
        <div class="message">Home </div>
        <div class="content-top shadow">
            <div class="btn-wrapper">
                <button class="btn btn-blue" data-target="#exampleModal" class="trigger-btn" data-toggle="modal" ng-click="crud('create','create')">Create account</button>
            </div>
            <div class="list" data-target="#exampleModal" class="trigger-btn" data-toggle="modal" ng-click="crud('create','create')">

            </div>
        </div>

        <div class="data-table">
            <div class="searchbar">
                <div class="searchbar1">
                    <div class="items tableheader">Show
                        <select style="color: black" name="" id="" ng-model="itemsPerPage" ng-change="myFunc()">
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="5000">5000</option>
                        </select>
                        Per Page
                    </div>
                    <div class="items tablenew">
                        <select style="color: black" name="" id="" ng-model="itemsPerPage" ng-change="myFunc()">
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="5000">5000</option>
                        </select>
                    </div>
                </div>
                <div class="searchbar2" style="display:felx;flex-direction:row-reverse;width:50%;">
                    <div class="tableheader">Search : <input type="text" placeholder="Search Here" ng-model="test"></div>
                    <div class="tablenew"><input type="text" placeholder="Search Here" ng-model="test"></div>
                </div>
            </div>
            <table class="table table-hover table-striped" style="width: 100%">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Vendor Name</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Lock</th>
                        <th>Delete</th>
                        <th>Credit/Withdrawal</th>
                        <th>Clear</th>
                        <th>Bonus</th>
                        <th>Hist</th>
                        <th>Logs</th>
                        <!-- <th>Users</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="(key,item) in pagedItems[currentPage]| orderBy:sort.sortingOrder:sort.reverse | filter:test">
                        <td><%item.name%></td>
                        <td><%item.username%></td>
                        <td><%item.email%></td>
                        <td><%item.amount%></td>
                        <td><%item.status%></td>
                        <td>
                            <button class="  btn " title="Edit" ng-click="crud(item,'edit')" data-toggle="modal" data-target="#exampleModal2"><i class="fa fa-align-justify"></i> </button>
                        </td>
                        <td>
                            <button class="btn " title="Change Pass" ng-click="crud(item,'pass')" data-toggle="modal" data-target="#exampleModal3"><i class="fa fa-lock"></i></button>
                        </td>
                        <td>
                            <button class="  btn " title="Delete" ng-click="crud(item,'delete')" data-toggle="modal" data-target="#exampleModal4"><i class="fa fa-trash"></i></button>
                        </td>
                        <td>
                            <button class="btn btn-primary" title="Add Credit" ng-click="crud(item,'balance')" data-toggle="modal" data-target="#exampleModal6">+</button>
                            <button class="btn btn-primary" title="Remove Credit" ng-click="crud(item,'withdrawal')" data-toggle="modal" data-target="#exampleModal7">-</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" title="clear credit" ng-click="crud(item,'clear')" data-toggle="modal" data-target="#exampleModal10">clear</button>
                        </td>
                        <td>
                            <button class="  btn " title="Control Bonus" ng-click="crud(item,'bonus')" data-toggle="modal" data-target="#exampleModalbunus"><%item.bounceback%></button>
                        </td>
                        <td>
                            <a href="#!transctionhistory">
                                <button class="  btn " title="Vendor History" ng-click="setsequence(item)"><i class="fa fa-history"></i></button>
                            </a>
                        </td>
                        <td>
                            <button class="btn" title="Vendor Logs" ng-click="vendorhistory(item,'logs')" data-toggle="modal" data-target="#exampleModal8"><i class="fa fa-history"></i></button>
                        </td>
                        <!-- <td>
                            <a href="#!AdminUsers">
                                <button class="btn" title="Vendor Users" ng-click="vendoru(item)"><i
                                        class="fa fa-user"></i></button>
                            </a>
                        </td> -->
                    </tr>
                </tbody>
            </table>
            <div class="tablenew">
                <div class="tablehead">
                    <div>Account#</div>
                    <div>Name</div>
                    <div>Balance</div>
                </div>

                <div class="tablebody" ng-repeat="(key,item) in pagedItems[currentPage] | filter:test">
                    <div class="tablebody1">
                        <div class="user-id">
                            <span ng-click="copyToClipboard(item.username);"><%item.username%></span>
                        </div>
                        <!--<i class="fas fa-copy"></i>-->
                        <div class="name"><%item.name%></div>

                        <div class="credit"><span><%item.amount%></span>/<span><%item.reward%></span></div>
                        <div><i class="fas fa-ellipsis-v" ng-model="item.remember_token" ng-click="item.remember_token?item.remember_token=false:item.remember_token=true"></i></div>
                    </div>
                    <div class="tableaction" ng-if="!item.remember_token">
                        <div ng-class="{Online:'state2', Offline:'state'}[item.status]"><span><%item.status%></span></div>
                        <div>
                            <button class="  btn " title="Edit" ng-click="crud(item,'edit')" data-toggle="modal" data-target="#exampleModal2"><i class="fa fa-align-justify"></i> </button>
                        </div>
                        <div>
                            <button class="btn " title="Change Pass" ng-click="crud(item,'pass')" data-toggle="modal" data-target="#exampleModal3"><i class="fa fa-lock"></i></button>
                        </div>
                        <div>
                            <button class="  btn " title="Delete" ng-click="crud(item,'delete')" data-toggle="modal" data-target="#exampleModal4"><i class="fa fa-trash"></i></button>
                        </div>
                        <div>
                            <i title="Add Credit" ng-click="crud(item,'balance')" data-toggle="modal" data-target="#exampleModal6" class="fa fa-plus"></i>
                            <i title="Remove Credit" ng-click="crud(item,'withdrawal')" data-toggle="modal" data-target="#exampleModal7" class="fa fa-minus"></i>
                        </div>
                        <div>
                            <i class="btn btn-danger" title="clear credit" ng-click="crud(item,'clear')" data-toggle="modal" data-target="#exampleModal10">c</i>
                        </div>
                        <div>
                            <button class="  btn " title="Control Bonus" ng-click="crud(item,'bonus')" data-toggle="modal" data-target="#exampleModalbunus"><%item.bounceback%></button>
                        </div>
                        <div>
                            <a ng-click="setsequence(item)" href="#!transctionhistory">
                                <i class="fa fa-history" title="Vendor History"></i>
                            </a>
                        </div>
                        <div>
                            <i class="fa fa-history" title="Vendor Logs" ng-click="vendorhistory(item,'logs')" data-toggle="modal" data-target="#exampleModal8"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bodyview3">
                <button class="btn btn-dark " ng-class="{disabled:currentPage == 0}">
                    <a style="color:white;" href ng-click="prevPage()">« Prev</a>
                </button>
                <button class="btn btn-dark " ng-repeat="n in range(pagedItems.length, currentPage, currentPage + gap) " ng-class="{active: n == currentPage}" ng-click="setPage()"> <a style="color:white;" href ng-bind="n + 1">1<%n%></a>
                </button>
                <button class="btn btn-dark "
                    ng-class="{disabled: (currentPage) == pagedItems.length - 1}">
                    <a style="color:white;" href ng-click="nextPage()">Next »</a>
                </button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create New Vendor</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body1">
                <div class="inputs">
                    <div>
                        <label for="name">Name:</label>
                        <input type="text" id="name" placeholder="name" ng-model="register.name" ng-change="guid()">
                    </div>
                    <div>
                        <label for="username">UserName:</label>
                        <input type="text" id="username" placeholder="username" ng-model="register.username"
                            disabled="disabled">
                    </div>
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" id="email" placeholder="email" ng-model="register.email">
                    </div>

                    <div>
                        <label for="password">Password:</label>
                        <input type="text" id="password" placeholder="password" ng-model="register.password">
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal"
                    ng-click="registervendro()">Register</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Vendor</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body2">
                <div class="inputs">
                    <div>
                        <label for="name">Name</label>
                        <input type="text" id="name" placeholder="name" ng-model="register.name">
                    </div>
                    <div>
                        <label for="username">UserName</label>
                        <input type="text" id="username" placeholder="username" ng-model="register.username">
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="email" ng-model="register.email">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal"
                    ng-click="registervendro()">Update</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update Vendor Password</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body3">
                <div class="inputs">
                    <div>
                        <label for="password"><%register.name%></label>
                        <input type="text" id="password" placeholder="password" ng-model="register.password">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Update</button>
    </div>
</div>
</div>
</div>

<div class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Vendor</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body4">
                <div class="inputs">
                    <label for="name">Vendor Name : <%register.name%></label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Delete</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal5" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-content5" style="width:800px">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Vendor Log</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body5" style="width:800px">
                <div class="inputs">
                    <div class="name">Vendor Name: <%register.name%></div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Userid</th>
                                <th>Transction Amount</th>
                                <th>Transction Type</th>
                                <th>Transction note</th>
                                <th>Transction Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="item in histroy">
                                <td><%item.vendorid%></td>
                                <td><%item.transction_amount%></td>
                                <td><%item.transction_type%></td>
                                <td><%item.transction_note%></td>
                                <td><%item.created_at%></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal6" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-content6">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Vendor Credit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body6">
                <div class="inputs">
                    <div>
                        <label for="password"><%register.name%></label>
                        <input type="text" id="password" placeholder="Add Credit" ng-model="register.balance">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Add
                    Credit</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal7" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-content6">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Remove Vendor Credit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body6">
                <div class="inputs">
                    <div>
                        <label for="password"><%register.name%></label>
                        <input type="text" id="password" placeholder="Remove Credit" ng-model="register.balance">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Remove
                    Credit</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal10" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-content6">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Clear Account Credit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body6">
                <div class="inputs">
                    <div>
                        Name:<label for="password"><%register.name%></label>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Clear
                    Account</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModalbunus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-content6">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update bounceback</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body6">
                <div class="inputs">
                    <div>
                        <label for="password">Add Bounceback</label>
                        <input type="text" id="password" placeholder="Add Credit Detail" ng-model="register.balance">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">
                    Update</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal8" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-content5" style="width:800px">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Vendor Log</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body5" style="width:800px">
                <div class="inputs">
                    <div class="name">Vendor Name: <%register.name%></div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>Log Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="(key,item) in histroy">
                                <td><%key+1%></td>
                                <td><%name.username%></td>
                                <td><%item.log_date%></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>