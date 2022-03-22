<html>

<head>
    <title>Lobby Renoslots</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Cache-control" content="public">
    <link rel="shortcut icon" href="logo.jpg" type="image/x-icon">
    <title>Play RenoNights
        Here You can play Renonights
        (Reno, Renoslots, Renocasino , Renoraces, Renoshooting )
        Sweepstakes ,Casino ,Racing and shooting games online at
        any place! Just use Your access code and enjoy! No downloads!</title>  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="Infornocss/style.css?1.2.40">
    <script src="Infornojs/jquery.min.js"></script>
    <script type="text/javascript">
        var site_url = "./";
        var current_page = "Lobby";
        var currentTab = '';
        var platform_lock = 0;
        var lock_game = [ /*"fishing2","fishinggod","fishingwar"*/ ];
        var app_version = '1.2.40';

        function getUserInfo() {
            var userJs = {

            };
            return userJs;
        }
    </script>
</head>
<script>
    var lobby_games;
</script>


<body class="notSelectable" style="user-select: none;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <header id="m_header">
        <div id="inferno_point_holder">
            <div>
                <img src="Infornomedia/point_star.png" onclick="toggle_inferno_point()">
                <span id="inferno_points" onclick="toggle_inferno_point()">80</span>
                <div id="point_converter_popup">
                    <div>
                        <div id="point_converter_popup_header">Convert your winning to deposit</div>
                        <div id="point_converter_popup_body">
                            <div>AVAILABLE CASH: <span id="avialable_cash">0.00</span></div>
                            <input type="number" placeholder="add amount here" id="convertamount" required />
                            <div>
                                <button onclick="converPoints()">Apply</button>
                                <button onclick="toggle_inferno_point()">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="logo_holder">
            <a><img src="Infornomedia/reno.png"></a>
        </div>
        <div id="balance_holder" class="">
            <div onclick="refresh_balance(null,null,true)"><span style="opacity: 1;"></span> <i class="fa-redo" style="background-image: url(https://www.infernoslots.net/assets/img/refresh.png)"></i></div>
        </div>
    </header>

    <div id="jackpot_bar_m">
        <div data-img="grand">
            GRAND
        </div>
        <div data-img="major">
            <div>MAJOR</div>
        </div>
        <div data-img="minor">
            <div>MINOR</div>
        </div>
        <div data-img="mini">
            <div>MINI</div>
        </div>
    </div>
    <div id="m_footer">
        <div class="nav_home nav_item active" onclick="make_home()" data-nav=".nav_home">
            <div><svg viewBox="0 0 512 512">
                    <g>
                        <g>
                            <path d="M503.401,228.884l-43.253-39.411V58.79c0-8.315-6.741-15.057-15.057-15.057H340.976c-8.315,0-15.057,6.741-15.057,15.057 v8.374l-52.236-47.597c-10.083-9.189-25.288-9.188-35.367-0.001L8.598,228.885c-8.076,7.36-10.745,18.7-6.799,28.889 c3.947,10.189,13.557,16.772,24.484,16.772h36.689v209.721c0,8.315,6.741,15.057,15.057,15.057h125.913 c8.315,0,15.057-6.741,15.057-15.057V356.931H293v127.337c0,8.315,6.741,15.057,15.057,15.057h125.908 c8.315,0,15.057-6.741,15.056-15.057V274.547h36.697c10.926,0,20.537-6.584,24.484-16.772 C514.147,247.585,511.479,236.245,503.401,228.884z M433.965,244.433c-8.315,0-15.057,6.741-15.057,15.057v209.721h-95.793 V341.874c0-8.315-6.742-15.057-15.057-15.057H203.942c-8.315,0-15.057,6.741-15.057,15.057v127.337h-95.8V259.49 c0-8.315-6.741-15.057-15.057-15.057H36.245l219.756-200.24l74.836,68.191c4.408,4.016,10.771,5.051,16.224,2.644 c5.454-2.41,8.973-7.812,8.973-13.774V73.847h74.002v122.276c0,4.237,1.784,8.276,4.916,11.13l40.803,37.18H433.965z">
                            </path>
                        </g>
                    </g>
                </svg>
                <div>Home</div>
            </div>
        </div>
        <div class="nav_daily nav_item" onclick="check_timer(1,this);win_animation_daily_wheel();toggleNaV('.nav_daily')">
            <div>
                <svg viewBox="0 0 64 64">
                    <path
                        d="m32 64c16.542 0 30-13.458 30-30 0-15.196-11.105-27.773-26.021-29.735.009-.09.021-.18.021-.265 0-2.206-1.794-4-4-4s-4 1.794-4 4c0 .085.012.175.021.265-14.916 1.962-26.021 14.539-26.021 29.735 0 16.542 13.458 30 30 30zm23.212-35.211c.552 0 1-.447 1-1 0-.104-.03-.198-.06-.293.469 1.767.75 3.609.823 5.51h-14.026c-.115-1.278-.454-2.489-.97-3.605l12.188-7.036c.824 1.579 1.479 3.26 1.954 5.018-.156-.349-.503-.593-.909-.593h-.011c-.552 0-.994.447-.994 1s.452.999 1.005.999zm.001 12.422c.386 0 .711-.226.878-.546-.48 1.735-1.144 3.396-1.968 4.96l-12.149-7.015c.518-1.115.858-2.326.976-3.604h14.025c-.072 1.819-.336 3.591-.779 5.291.003-.03.018-.056.018-.086 0-.553-.448-1-1-1h-.011c-.552 0-.994.447-.994 1s.451 1 1.004 1zm-6.212 8.76h-.011c-.552 0-.994.447-.994 1s.452 1 1.005 1c.206 0 .386-.077.545-.184-1.272 1.256-2.682 2.374-4.199 3.336l-7.012-12.146c1.021-.724 1.913-1.614 2.638-2.636l12.146 7.013c-.952 1.501-2.058 2.895-3.298 4.156.104-.158.181-.336.181-.54-.001-.552-.449-.999-1.001-.999zm-10.76 6.211h-.011c-.552 0-.994.447-.994 1s.452 1 1.005 1c.128 0 .247-.029.359-.072-1.796.492-3.67.789-5.601.865v-14.026c1.277-.115 2.488-.455 3.603-.972l7.015 12.149c-1.57.827-3.237 1.491-4.98 1.972.354-.153.604-.505.604-.917 0-.552-.448-.999-1-.999zm-17.858-.055 7.017-12.148c1.114.516 2.324.855 3.601.971v14.025c-3.821-.152-7.423-1.163-10.618-2.848zm-9.502-8.773 12.147-7.012c.724 1.021 1.616 1.914 2.639 2.637l-7.015 12.145c-3.129-1.985-5.787-4.643-7.771-7.77zm25.615-21.139c.001.001.002.002.003.003s.003.001.004.002c2.68 1.557 4.491 4.45 4.496 7.766 0 .007-.004.014-.004.021s.004.012.004.019c-.014 4.95-4.044 8.974-8.999 8.974-4.963 0-9-4.037-9-9s4.037-9 9-9c1.639 0 3.172.447 4.496 1.215zm-5.496-16.837v13.673c-1.279.116-2.491.456-3.607.974l-7.036-12.185c3.111-1.624 6.617-2.611 10.357-2.799.106.127.202.239.286.337zm-12.379 3.455 7.04 12.192c-1.023.726-1.916 1.618-2.641 2.643l-12.188-7.037c1.981-3.147 4.639-5.816 7.789-7.798zm-8.788 9.53 12.188 7.037c-.517 1.115-.855 2.327-.971 3.605h-14.026c.148-3.836 1.141-7.445 2.809-10.642zm11.218 12.643c.117 1.278.458 2.489.976 3.604l-12.15 7.014c-1.687-3.196-2.699-6.798-2.852-10.618zm19.928-7.338c-.724-1.023-1.616-1.916-2.639-2.641l7.04-12.194c3.149 1.983 5.808 4.652 7.787 7.799zm-4.37-3.643c-1.116-.518-2.329-.858-3.609-.975v-13.672c.085-.098.181-.211.287-.34 3.74.188 7.247 1.177 10.357 2.802zm-4.609-22.025c1.103 0 2 .897 2 2 0 .164-.064.386-.175.646-.003.006-.006.013-.009.02-.32.742-1.024 1.794-1.799 2.765-.005.007-.016.01-.021.018-.002-.002-.004-.004-.006-.006-1.057-1.333-1.99-2.826-1.99-3.443 0-1.103.897-2 2-2zm-3.274 4.196c.174.319.367.636.57.944-13.765 1.349-24.296 12.807-24.296 26.86 0 4.898 1.318 9.492 3.608 13.458.007.014.007.03.015.044.012.02.028.034.041.054 2.362 4.05 5.745 7.431 9.798 9.79.016.01.024.026.041.036.024.015.052.02.077.032 3.957 2.276 8.537 3.586 13.42 3.586 4.878 0 9.454-1.307 13.407-3.579.03-.014.062-.021.09-.037.02-.011.029-.03.048-.042 4.045-2.356 7.424-5.731 9.783-9.774.016-.022.036-.039.05-.063.01-.017.009-.036.018-.053 2.288-3.965 3.604-8.556 3.604-13.452 0-14.053-10.53-25.51-24.295-26.861.202-.308.396-.624.569-.942 14.142 1.638 24.726 13.471 24.726 27.803 0 15.439-12.561 28-28 28s-28-12.561-28-28c0-14.332 10.584-26.165 24.726-27.804z">
                    </path>
                    <path d="m8.847 39.211h-.011c-.552 0-.994.447-.994 1s.452 1 1.005 1c.552 0 1-.447 1-1s-.449-1-1-1z">
                    </path>
                    <path
                        d="m49.001 16.029h-.011c-.552 0-.994.447-.994 1s.452 1 1.005 1c.552 0 1-.447 1-1s-.448-1-1-1z">
                    </path>
                    <path
                        d="m15.059 49.971h-.011c-.552 0-.994.447-.994 1s.452 1 1.005 1c.552 0 1-.447 1-1s-.449-1-1-1z">
                    </path>
                    <path
                        d="m38.242 11.816c.552 0 1-.447 1-1s-.448-1-1-1h-.011c-.552 0-.994.447-.994 1s.452 1 1.005 1z">
                    </path>
                    <path
                        d="m25.817 56.182h-.011c-.552 0-.994.447-.994 1s.452 1 1.005 1c.552 0 1-.447 1-1s-.448-1-1-1z">
                    </path>
                    <path
                        d="m25.818 11.816c.552 0 1-.447 1-1s-.448-1-1-1h-.011c-.552 0-.994.447-.994 1s.453 1 1.005 1z">
                    </path>
                    <path
                        d="m15.059 18.027c.552 0 1-.447 1-1s-.448-1-1-1h-.011c-.552 0-.994.447-.994 1s.452 1 1.005 1z">
                    </path>
                    <path d="m8.847 28.787c.552 0 1-.447 1-1s-.448-1-1-1h-.011c-.552 0-.994.447-.994 1s.452 1 1.005 1z">
                    </path>
                    <path d="m26 32c0 .553.447 1 1 1h9.997c.553 0 1-.447 1-1s-.447-1-1-1h-9.997c-.553 0-1 .447-1 1z">
                    </path>
                    <path d="m36.997 34h-9.997c-.553 0-1 .447-1 1s.447 1 1 1h9.997c.553 0 1-.447 1-1s-.447-1-1-1z">
                    </path>
                    <path d="m34 37h-4.003c-.553 0-1 .447-1 1s.447 1 1 1h4.003c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                </svg>
                <!-- <div id="dailyWheelToggle" onclick="toggleDailyEntryTimer()"> <video playsinline="" autoplay="" muted="" loop="" poster="Infornomedia/wheel.gif" id="bgvid">
                        <source src="Infornomedia/wheel.webm" type="video/webm">
                    </video> </div> -->
                <div id="dw_error" class="hide" onclick="show_error()"> <i class="fa fa-times-circle" onclick="show_error()"></i>
                    <div id="dw_message">
                        <p>You do not meet the Daily Wheel Rules. </p>
                        <p>(must have 100 in total bets in 24 hours, min of 5 deposit in 3 days)</p>
                    </div>
                </div>
                <div id="daliy_win_bar" class="hide">
                    <div id="daliy_win_holder"> <i onclick="show_dw_bar()" id="close_dw_bar"><img src="Infornocss/close.svg"></i> <video playsinline="" autoplay="" muted="" loop="" poster="Infornomedia/wheel.gif" id="daliy_win_img" data-clicked="0">
                            <source src="Infornomedia/wheel.webm" type="video/webm">
                        </video>
                        <div id="daliy_win_band"> <img src="Infornomedia/band.png" data-clicked="0"> <span  data-clicked="0">Daily Entry</span> </div>
                    </div>
                </div>
                <!-- <div id="dwinAnimation" style="z-index: 100000; position: fixed;">
                    <div class="jptb-animation">
                        <div class="jptb-animation-container" style="height: 1089px; width: 1089px; font-size: 16px;">
                            <div class="jptb-animation-light1"></div>
                            <div class="jptb-animation-light2"></div>
                            <div class="jptb-animation-wrap">
                                <div class="jptb-animation-coins"></div>
                                <div class="jptb-animation-jackpot"></div>
                            </div>
                            <div class="jptb-animation-table">
                                <div class="jptb-animation-amount"><span id="jptb-win-currency"></span><span id="djptb-win-amount">00.00</span></div>
                                <div class="jptb-animation-counter">DAILY WHEEL</div>
                            </div> <button class="jptb-animation-continue" id="djptb-animation-continue" onclick="dw_give(this)">Continue</button>
                        </div>
                    </div>
                </div> -->
             
                <script src="Infornojs/XZgOYDeBBA.js?1.2.40"></script>
                <script type="text/javascript" src="Infornojs/z3IkFyXFEQksEQKoINhY.js?1.2.40"></script>
                <div>Daily Entry</div>
            </div>
        </div>
        <div onclick="search_toggle();toggleNaV('.nav_search')" class="searchInput nav_search nav_item">
            <div class="searchInput">
                <svg viewBox="0 0 512.005 512.005" class="searchInput">
                    <g>
                        <g>
                            <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667 S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6 c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z">
                            </path>
                        </g>
                    </g>
                </svg>
                <div class="searchInput">Search</div>
            </div>
        </div>
        <div onclick="toggleSideNav();toggleNaV('.nav_menu')" class="nav_menu nav_item">
            <div>
                <svg viewBox="0 0 512 512">
                    <g>
                        <g>
                            <path d="M492,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h472c11.046,0,20-8.954,20-20S503.046,236,492,236z">
                            </path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M492,76H20C8.954,76,0,84.954,0,96s8.954,20,20,20h472c11.046,0,20-8.954,20-20S503.046,76,492,76z">
                            </path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M492,396H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h472c11.046,0,20-8.954,20-20 C512,404.954,503.046,396,492,396z">
                            </path>
                        </g>
                    </g>
                </svg>
                <div>Menu</div>
            </div>
        </div>
    </div>
    <div id="sideNav">
        <div class="closeSideNav">
            <div>
                <img src="https://www.infernoslots.net/assets/img/close.svg" onclick="toggleSideNav()">
            </div>
            <div>
                190566 </div>
            <div>
                <div class="m_logout_exit" onclick="mExitToggle()">
                    <div>Logout</div>
                </div>
            </div>
        </div>
        <div class="sideNavContent">
            <div id="sideNavTitle">
                <div class="m_logout">
                    <div class="m_logout_btns" style="display: none;">
                        <div>Are you sure want to logout?</div>
                        <a href="logoutself" class="yes" onclick="clearInterval(logCheck)">Yes</a>
                        <a href="javascript:void(0)" class="no" onclick="mExitToggle()">NO</a>
                    </div>
                </div>
            </div>
            <div class="sideNavItem userMenuToggle" onclick="toggleM_UserMenu();">
                User &nbsp;<svg viewBox="0 0 490.688 490.688">
                    <path d="M472.328,120.529L245.213,347.665L18.098,120.529c-4.237-4.093-10.99-3.975-15.083,0.262 c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667 c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262 L472.328,120.529z">
                    </path>
                    <path d="M245.213,373.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,135.633c-4.093-4.237-3.975-10.99,0.262-15.083 c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.093-4.237,10.845-4.354,15.083-0.262 c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,370.279 C250.748,372.281,248.039,373.408,245.213,373.415z">
                    </path>
                </svg> </div>
            <div class="sideNavProfileMenu" style="display:none">
                <div class="profile_menu_item"><a>Balance</a>
                </div>
                <div class="profile_menu_item"><a>Welcome Package</a></div>
                <div class="profile_menu_item"><a>Referral Code</a></div>
                <div class="profile_menu_item"><a>History</a>
                </div>
                <div class="profile_menu_item"><a>Bonuses</a>
                </div>
                <div class="profile_menu_item"><a>Points</a>
                </div>
                <div class="profile_menu_item"><a>Notifications</a></div>
                <div class="profile_menu_item"><a>Profile
                        info</a></div>
            </div>
            <div class="sideNavItem nav_new" data-nav=".nav_new" onclick="make_game_section('isnew','1','New Games','#6CD071',0,16,16,true,'.nav_new');toggleSideNav()">
                New Games
            </div>
            <div class="sideNavItem nav_shooting" data-nav=".nav_shooting" onclick="make_game_section('Type','racing','Racing Games','#a73934',0,16,16,true,'.nav_racing');toggleSideNav()">
                Racing Games
            </div>

            <div class="sideNavItem nav_slot" data-nav=".nav_slot" onclick="make_game_section('Type','slots','Slot Games','#a73934',0,16,16,true,'.nav_slot');toggleSideNav()">
                Slot Games
            </div>
            <div class="sideNavItem nav_casino" data-nav=".nav_casino" onclick="make_game_section('Type','casino','Casino Games','#a73934',0,16,16,true,'.nav_casino');toggleSideNav()">
                Casino Games
            </div>
            <div class="sideNavItem nav_slot" data-nav=".nav_slot" onclick="make_game_section('Type','justfun','Just Fun','#a73934',0,16,16,true,'.nav_justfun');toggleSideNav()">
                Just Fun
            </div>

            <div class="sideNavItem nav_all" data-nav=".nav_all" onclick="make_game_section('all','0','All Games','#6CD071',0,16,16,true,'.nav_all');toggleSideNav()">
                All Games
            </div>
            {{-- <div id="provider" class="sideNavItem has_sub nav_provider" onclick="toggleSideNavProvider()"
                data-nav=".nav_provider">Provider &nbsp;<svg viewBox="0 0 490.688 490.688">
                    <path
                        d="M472.328,120.529L245.213,347.665L18.098,120.529c-4.237-4.093-10.99-3.975-15.083,0.262 c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667 c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262 L472.328,120.529z">
                    </path>
                    <path
                        d="M245.213,373.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,135.633c-4.093-4.237-3.975-10.99,0.262-15.083 c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.093-4.237,10.845-4.354,15.083-0.262 c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,370.279 C250.748,372.281,248.039,373.408,245.213,373.415z">
                    </path>
                </svg></div> --}}
            <div class="sideNavProvider" style="display:none;">
                <div class="subItems aristocrat" onclick="make_game_section('SectionId','aristocrat','ARISTOCRAT','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>aristocrat</span>
                </div>
                <div class="subItems amatic" onclick="make_game_section('SectionId','amatic','AMATIC','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>amatic</span>
                </div>
                <div class="subItems microgaming" onclick="make_game_section('SectionId','microgaming','MICROGAMING','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>microgaming</span>
                </div>
                <div class="subItems greentube" onclick="make_game_section('SectionId','greentube','GREENTUBE','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>greentube</span>
                </div>
                <div class="subItems netent" onclick="make_game_section('SectionId','netent','NETENT','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>netent</span>
                </div>
                <div class="subItems gaminator" onclick="make_game_section('SectionId','gaminator','GAMINATOR','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>gaminator</span>
                </div>
                <div class="subItems merkur" onclick="make_game_section('SectionId','merkur','MERKUR','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>merkur</span>
                </div>
                <div class="subItems playtech" onclick="make_game_section('SectionId','playtech','PLAYTECH','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>playtech</span>
                </div>
                <div class="subItems wazdan" onclick="make_game_section('SectionId','wazdan','WAZDAN','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>wazdan</span>
                </div>
                <div class="subItems apollo" onclick="make_game_section('SectionId','apollo','APOLLO','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>apollo</span>
                </div>
                <div class="subItems igrosoft" onclick="make_game_section('SectionId','igrosoft','IGROSOFT','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>igrosoft</span>
                </div>
                <div class="subItems quickspin" onclick="make_game_section('SectionId','quickspin','QUICKSPIN','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>quickspin</span>
                </div>
                <div class="subItems konami" onclick="make_game_section('SectionId','konami','KONAMI','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>konami</span>
                </div>
                <div class="subItems playson" onclick="make_game_section('SectionId','playson','PLAYSON','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>playson</span>
                </div>
                <div class="subItems booongo" onclick="make_game_section('SectionId','booongo','BOOONGO','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>booongo</span>
                </div>
                <div class="subItems igt" onclick="make_game_section('SectionId','igt','IGT','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>igt</span>
                </div>
                <div class="subItems fishing" onclick="make_game_section('SectionId','fishing','FISHING','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>fishing</span>
                </div>
                <div class="subItems spadegaming" onclick="make_game_section('SectionId','spadegaming','SPADEGAMING','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>spadegaming</span>
                </div>
                <div class="subItems pragmatic" onclick="make_game_section('SectionId','pragmatic','PRAGMATIC','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>pragmatic</span>
                </div>
                <div class="subItems cqgaming" onclick="make_game_section('SectionId','cqgaming','CQGAMING','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>cqgaming</span>
                </div>
                <div class="subItems NetEnt" onclick="make_game_section('SectionId','NetEnt','NETENT','#6CD071',0,16,16,true,'.nav_provider');toggleSideNav()">
                    <span>NetEnt</span>
                </div>
            </div>
        </div>
    </div>
    <style type="text/css">
        #m_header {
            padding: 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            vertical-align: middle;
            align-items: center;
            justify-content: center;
            padding: 0 15px;
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            z-index: 9998;
        }

        #m_header #balance_holder::after,
        #m_header::before {
            display: none !important;
        }

        #m_header>div {
            width: calc((1 / 3) * 100%);
            box-sizing: border-box;
            padding: 0 5px;
        }

        #inferno_point_holder {
            justify-content: end;
        }

        #point_converter_popup_header {
            font-size: 100%;
        }

        #point_converter_popup {
            position: fixed;
            top: 65px;
            left: 0;
            max-width: 99%;
            min-width: 320px;
            z-index: 9999;
        }

        #point_converter_popup::after {
            left: 30px;
        }

        #m_header>div#logo_holder {
            position: relative;
            text-align: center;
        }

        #m_header>div#logo_holder img {
            max-width: 40px;
        }

        #balance_holder {
            justify-content: flex-end;
        }

        #m_header:after {
            content: "";
            width: 85%;
            height: 1px;
            position: absolute;
            bottom: auto;
            top: auto;
            left: 50%;
            transform: translateX(-50%);
            right: 0;
            background: linear-gradient(to right, rgba(176, 176, 176, 0) 0%, rgba(176, 176, 176, 1) 50%, rgba(176, 176, 176, 0) 100%);
            opacity: 0.45;
            z-index: 9998 !important;
            border-style: none;
            border-width: 0;
        }

        #m_header::after {
            top: 63px;
        }

        #m_header:before {
            top: 120px;
        }

        #jackpot_bar_m {
            margin-top: 65px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            vertical-align: middle;
            align-items: center;
            justify-content: center;
            padding: 0 15px;
        }

        #jackpot_bar_m>div {
            width: 25%;
            box-sizing: border-box;
            padding: 0 5px;
            color: #fff;
            text-align: center;
            font-weight: 700;
        }

        #jackpot_bar_m>div>img {
            height: 25px;
            width: auto;
        }

        .section_title {
            padding: 0 10px;
        }

        .game_block {
            padding: 15px 0;
        }

        main {
            padding: 0 0 65px 0;
        }

        #dailyWheelToggle,
        #sideTabs,
        #daliy_win_bar {
            bottom: 55px !important;
        }

        #m_footer {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: 65px;
            z-index: 9998;
            background: #1a1a22;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            font-weight: 500;
            color: #fff;
        }

        #m_footer::before {
            content: "";
            width: 100%;
            height: 1px;
            position: absolute;
            top: 0px;
            z-index: 1;
            opacity: 0.45;
            background: linear-gradient(to right, rgba(176, 176, 176, 0) 0%, rgba(176, 176, 176, 1) 50%, rgba(176, 176, 176, 0) 100%);
            top: 0;
        }

        #m_footer>div {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            vertical-align: middle;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: calc((1 / 4) * 100%);
            position: relative;
        }

        #m_footer>div>div {
            text-align: center;
            font-weight: 500;
            font-size: 13px;
        }

        #m_footer>div svg {
            width: 20px;
            fill: currentColor;
        }

        #search_bar>div:first-child,
        #search_bar>div:last-child {
            flex-grow: 0;
            max-width: 350px;
        }

        #top_search_results {
            position: fixed;
            top: 100%;
            left: 0;
            background: #fff;
            color: #000;
            width: 100vw;
            overflow-y: auto;
            max-height: 100vh;
        }

        .foundGameProvide {
            display: none !important;
        }

        .m_logout {}

        .m_logout_exit {
            text-align: right;
        }

        .m_logout_exit div {
            background: #242424;
            padding: 10px 15px;
            font-size: 15px;
            display: inline-block;
            font-weight: 400;
            cursor: pointer;
        }

        .m_logout_btns {
            text-align: right;
            margin-top: 15px;
        }

        .m_logout_btns div {
            margin-bottom: 5px;
        }

        .m_logout_btns>a {
            padding: 10px 15px;
            font-size: 15px;
            display: inline-block;
            font-weight: 400;
            cursor: pointer;
            color: #fff;
            text-decoration: none;
        }

        .m_logout_btns>a.yes {
            background: #86281f;
        }

        .m_logout_btns>a.no {
            background: #2e7423;
        }

        .closeSideNav {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            vertical-align: middle;
            align-items: center;
            justify-content: end;
            height: 55px;
            background: #15181e;
        }

        #sideNav:not(.show) .closeSideNav {
            display: none;
        }

        .closeSideNav>div {
            width: calc((1/3) * 100%);
            box-sizing: border-box;
            text-align: center;
            padding: 0 10px;
        }

        .closeSideNav>div:first-child {
            text-align: left;
        }

        #sideNavTitle {
            margin: 0;
        }

        .sideNavContent {
            overflow-y: auto;
            height: calc(100vh - 55px);
        }

        .sideNavItem svg {
            max-width: 15px;
            fill: currentColor;
        }

        .sideNavProfileMenu,
        .sideNavProvider {
            padding: 0 0 0 30px;
        }

        #sideNav .sideNavProfileMenu .profile_menu_item {
            text-align: right;
        }

        .sideNavProvider .subItems {
            text-align: right;
        }

        .section_title h2 {
            margin: 5px 0;
            font-size: 20px;
        }

        .game_cell {
            padding: 2px;
            margin-bottom: 5px;
        }

        .game_badges>span {
            font-size: 8px;
            padding: 2px;
            line-height: 1;
        }

        .game_badges>span::after {
            bottom: -4px;
            border-width: 5px 4px 0 0;
        }

        .game_title {
            padding: 3px;
        }
    </style>
    <div id="search_bar">
        <div onclick="search_toggle()">
            <svg viewBox="0 0 512.005 512.005">
                <g>
                    <g>
                        <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667 S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6 c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z">
                        </path>
                    </g>
                </g>
            </svg>
        </div>
        <div id="input_bar" class="searchInput"><input type="text" placeholder="Search" onkeyup="topBarGame(this)" class="searchInput"></div>
        <div onclick="search_toggle()">
            <svg viewBox="0 0 329.26933 329">
                <g>
                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"></path>
                </g>
            </svg>
        </div>
    </div>
    <main>
    </main>

    <!-- WCSSS -->
    <style type="text/css">
        .easyWheel {
            position: relative;
            max-width: 100%;
            margin: 4em auto 1em;
            font-size: 25px;
            font-weight: 700
        }

        .easyWheel,
        .easyWheel * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none
        }

        .eWheel-wrapper {
            position: relative
        }

        .easyWheel .eWheel-inner {
            display: block;
            overflow: hidden;
            width: 100%;
            height: 100%;
            position: relative
        }

        .easyWheel .eWheel {
            border-radius: 100%;
            overflow: hidden
        }

        .easyWheel .eWheel,
        .easyWheel .eWheel>.eWheel-bg-layer,
        .easyWheel .eWheel>.eWheel-txt-wrap,
        .easyWheel .eWheel>.eWheel-txt-wrap>.eWheel-txt {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%
        }

        .easyWheel .eWheel>.eWheel-bg-layer,
        .easyWheel .eWheel>.eWheel-txt-wrap>.eWheel-txt {
            margin: 0 auto;
            border-radius: 100%;
            padding: 0;
            list-style: none;
            overflow: hidden;
            color: #ecf0f1
        }

        .easyWheel .eWheel>.eWheel-bg-layer,
        .easyWheel .eWheel>.eWheel-txt-wrap {
            transform: rotate(-90deg)
        }

        .easyWheel .eWheel .eWheel-child .eWheel-inside {
            display: table;
            transform: rotate(0) skew(-45deg);
            width: 50%;
            height: 50%;
            transform-origin: 0 0;
            text-align: right;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            overflow: hidden
        }

        .easyWheel .eWheel .eWheel-child .eWheel-inside>div {
            display: table-cell;
            vertical-align: middle;
            width: 100%;
            height: 100%;
            transform: rotate(25deg);
            transform-origin: 115% 25%;
            padding-right: 40px;
            font-size: 18px;
            font-weight: 700
        }

        .easyWheel .eWheel>.eWheel-bg-layer>div {
            overflow: hidden;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            -webkit-transform-origin: 0 0;
            -moz-transform-origin: 0 0;
            -ms-transform-origin: 0 0;
            -o-transform-origin: 0 0;
            transform-origin: 0 0;
            border: 1px solid transparent;
            background-color: #404040
        }

        .easyWheel .eWheel>.eWheel-bg-layer>div:nth-child(odd) {
            background-color: #616161
        }

        .easyWheel .eWheel>.eWheel-txt-wrap>.eWheel-txt>div {
            position: absolute;
            top: 50%;
            left: 50%;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            line-height: 1.2em;
            max-height: 23.4em;
            text-align: right;
            -webkit-transform-origin: 0 0;
            -moz-transform-origin: 0 0;
            -ms-transform-origin: 0 0;
            -o-transform-origin: 0 0;
            transform-origin: 0 1px;
            width: 50%;
            padding-right: 6%;
            font-weight: 700;
            font-size: 100%;
            cursor: default;
            color: #fff;
            text-align: right
        }

        .easyWheel .eWheel-center {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            text-align: center
        }

        .easyWheel .eWheel-center>.ew-center-empty,
        .easyWheel .eWheel-center>.ew-center-html {
            max-width: 100%;
            position: relative;
            top: 50%;
            left: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
            z-index: 2
        }

        .easyWheel .eWheel-center>.ew-center-empty {
            position: absolute
        }

        .easyWheel .eWheel-center>img {
            max-width: 100%;
            width: 200px;
            position: relative;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%)
        }

        .easyWheel .eWheel-center>div {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 0 0 !important
        }

        .easyWheel .eWheel-marker {
            border-spacing: 90px;
            width: 16%;
            height: 16%;
            position: absolute;
            left: 50%;
            top: -18%;
            margin-top: 7%;
            margin-left: -8%;
            transition: .2 rotate linear;
            z-index: 3;
            display: block;
            transform: rotate(0);
            transform-origin: 50% 35%
        }

        .easyWheel .eWheel-marker>svg {
            height: 100%;
            display: block;
            text-align: center;
            margin: 0 auto
        }

        .easyWheel .rotate {
            transform: rotate(100deg)
        }

        .eWheel>.eWheel-bg-layer>svg {
            margin: 0 auto;
            border-radius: 50%;
            display: block;
            width: 100%;
            height: 100%;
            transform: rotate(0)
        }

        .eWheel>.eWheel-txt-wrap>.eWheel-txt>div.ew-ccurrent {
            color: #cfd8dc
        }

        .deg1 {
            transform: rotate(22.5deg) translate(344%) rotate(-22.5deg);
        }

        .deg2 {
            transform: rotate(45deg) translate(344%) rotate(-45deg);
        }

        .deg3 {
            transform: rotate(67.5deg) translate(344%) rotate(-67.5deg);
        }

        .deg4 {
            transform: rotate(90deg) translate(344%) rotate(-90deg);
        }

        .deg5 {
            transform: rotate(112.5deg) translate(344%) rotate(-112.5deg);
        }

        .deg6 {
            transform: rotate(135deg) translate(344%) rotate(-135deg);
        }

        .deg7 {
            transform: rotate(157.5deg) translate(344%) rotate(-157.5deg);
        }

        .deg8 {
            transform: rotate(180deg) translate(344%) rotate(-180deg);
        }

        .deg9 {
            transform: rotate(202.5deg) translate(344%) rotate(-202.5deg);
        }

        .deg10 {
            transform: rotate(225deg) translate(344%) rotate(-225deg);
        }

        .deg11 {
            transform: rotate(247.5deg) translate(344%) rotate(-247.5deg);
        }

        .deg12 {
            transform: rotate(270deg) translate(344%) rotate(-270deg);
        }

        .deg13 {
            transform: rotate(292.5deg) translate(344%) rotate(-292.5deg);
        }

        .deg14 {
            transform: rotate(315deg) translate(344%) rotate(-315deg);
        }

        .deg15 {
            transform: rotate(337.5deg) translate(344%) rotate(-337.5deg);
        }

        .deg16 {
            transform: rotate(360deg) translate(344%) rotate(-360deg);
        }
    </style>
    <!-- WCSSE -->
    <!-- WAS -->
    <style type="text/css">
        .jptb-top-panel {
            font-size: 15.12px;
            height: 18px;
            line-height: 16.4808px;
            opacity: .7
        }

        .jptb-top-panel:hover {
            opacity: 1
        }

        .jptb-top-panel .jptb-plane {
            font-size: 14.12px
        }

        .jptb-top-panel .jptb-center .jptb-jackpot-item {
            padding: 0 6px
        }

        .jptb-top-panel .jptb-roller div {
            height: 24.3px;
            width: 100%
        }

        .jptb-top-panel .jptb-jackpot-counter-cell>div {
            height: 24.3px;
            width: 100%
        }

        .jptb-top-panel .jptb-jackpot-counter-cell {
            font-size: 14.12px;
            width: 12.6px;
            height: 18px;
            -webkit-transform: rotateX(-5deg);
            transform: rotateX(-5deg)
        }

        .jptb-top-panel .jptb-jackpot-name {
            margin-right: 3px
        }

        .jptb-top-panel.jptb-hitted .jptb-lamp {
            width: 18px;
            height: 18px;
            margin: 0 -1.8px
        }

        @keyframes rotation-2rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            45% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            55% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            100% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }
        }

        @-webkit-keyframes rotation-2rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            45% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            55% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            100% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }
        }

        @keyframes rotation-3rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            27% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            37% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            64% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            73% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            100% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }
        }

        @-webkit-keyframes rotation-3rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            27% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            37% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            64% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            73% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            100% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }
        }

        @keyframes rotation-4rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            19% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            27% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            46% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            54% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            73% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            81% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            100% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }
        }

        @-webkit-keyframes rotation-4rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            19% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            27% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            46% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            54% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            73% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            81% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            100% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }
        }

        @keyframes rotation-5rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            15% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            21% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            36% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            43% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            58% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            64% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            79% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            85% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            100% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }
        }

        @-webkit-keyframes rotation-5rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            15% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            21% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            36% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            43% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            58% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            64% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            79% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            85% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            100% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }
        }

        @keyframes rotation-6rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            12% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            18% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            30% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            35% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            47% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            53% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            65% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            70% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            82% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            88% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            100% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }
        }

        @-webkit-keyframes rotation-6rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            12% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            18% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            30% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            35% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            47% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            53% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            65% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            70% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            82% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            88% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            100% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }
        }

        @keyframes rotation-7rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            10% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            15% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            25% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            30% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            40% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            45% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            55% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            60% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            70% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            75% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            85% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            90% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            100% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }
        }

        @-webkit-keyframes rotation-7rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            10% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            15% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            25% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            30% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            40% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            45% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            55% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            60% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            70% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            75% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            85% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            90% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            100% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }
        }

        @keyframes rotation-8rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            9% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            13% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            22% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            26% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            35% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            39% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            48% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            52% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            61% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            65% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            74% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            78% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            87% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            91% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            100% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }
        }

        @-webkit-keyframes rotation-8rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            9% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            13% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            22% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            26% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            35% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            39% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            48% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            52% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            61% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            65% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            74% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            78% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            87% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            91% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            100% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }
        }

        @keyframes rotation-9rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            8% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            12% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            19% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            23% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            31% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            35% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            42% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            46% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            54% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            58% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            65% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            69% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            77% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            81% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            88% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            92% {
                -webkit-transform: translateY(-280px);
                transform: translateY(-280px)
            }

            100% {
                -webkit-transform: translateY(-280px);
                transform: translateY(-280px)
            }
        }

        @-webkit-keyframes rotation-9rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            8% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            12% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            19% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            23% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            31% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            35% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            42% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            46% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            54% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            58% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            65% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            69% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            77% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            81% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            88% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            92% {
                -webkit-transform: translateY(-280px);
                transform: translateY(-280px)
            }

            100% {
                -webkit-transform: translateY(-280px);
                transform: translateY(-280px)
            }
        }

        @keyframes rotation-10rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            7% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            10% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            17% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            21% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            28% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            31% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            38% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            41% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            48% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            52% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            59% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            62% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            69% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            72% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            79% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            83% {
                -webkit-transform: translateY(-280px);
                transform: translateY(-280px)
            }

            90% {
                -webkit-transform: translateY(-280px);
                transform: translateY(-280px)
            }

            93% {
                -webkit-transform: translateY(-315px);
                transform: translateY(-315px)
            }

            100% {
                -webkit-transform: translateY(-315px);
                transform: translateY(-315px)
            }
        }

        @-webkit-keyframes rotation-10rows {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            7% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            10% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            17% {
                -webkit-transform: translateY(-35px);
                transform: translateY(-35px)
            }

            21% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            28% {
                -webkit-transform: translateY(-70px);
                transform: translateY(-70px)
            }

            31% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            38% {
                -webkit-transform: translateY(-105px);
                transform: translateY(-105px)
            }

            41% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            48% {
                -webkit-transform: translateY(-140px);
                transform: translateY(-140px)
            }

            52% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            59% {
                -webkit-transform: translateY(-175px);
                transform: translateY(-175px)
            }

            62% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            69% {
                -webkit-transform: translateY(-210px);
                transform: translateY(-210px)
            }

            72% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            79% {
                -webkit-transform: translateY(-245px);
                transform: translateY(-245px)
            }

            83% {
                -webkit-transform: translateY(-280px);
                transform: translateY(-280px)
            }

            90% {
                -webkit-transform: translateY(-280px);
                transform: translateY(-280px)
            }

            93% {
                -webkit-transform: translateY(-315px);
                transform: translateY(-315px)
            }

            100% {
                -webkit-transform: translateY(-315px);
                transform: translateY(-315px)
            }
        }

        .jptb-top-panel .jptb-center .jptb-figure0 {
            -webkit-transform: rotate3d(1, 0, 0, 0deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, 0deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel .jptb-center .jptb-figure1 {
            -webkit-transform: rotate3d(1, 0, 0, -36deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, -36deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel .jptb-center .jptb-figure2 {
            -webkit-transform: rotate3d(1, 0, 0, -72deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, -72deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel .jptb-center .jptb-figure3 {
            -webkit-transform: rotate3d(1, 0, 0, -108deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, -108deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel .jptb-center .jptb-figure4 {
            -webkit-transform: rotate3d(1, 0, 0, -144deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, -144deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel .jptb-center .jptb-figure5 {
            -webkit-transform: rotate3d(1, 0, 0, -180deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, -180deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel .jptb-center .jptb-figure6 {
            -webkit-transform: rotate3d(1, 0, 0, -216deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, -216deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel .jptb-center .jptb-figure7 {
            -webkit-transform: rotate3d(1, 0, 0, -252deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, -252deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel .jptb-center .jptb-figure8 {
            -webkit-transform: rotate3d(1, 0, 0, -288deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, -288deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel .jptb-center .jptb-figure9 {
            -webkit-transform: rotate3d(1, 0, 0, -324deg) translate3d(0, 0, 24.3px);
            transform: rotate3d(1, 0, 0, -324deg) translate3d(0, 0, 24.3px)
        }

        .jptb-top-panel {
            position: absolute;
            width: 100%;
            opacity: .65;
            pointer-events: none;
            z-index: 1000000;
            padding: 0 13px;
            color: #fbea5e;
            text-transform: uppercase;
            white-space: nowrap;
            overflow: hidden;
            -webkit-box-sizing: border-box;
            box-sizing: border-box
        }

        .jptb-top-panel * {
            -webkit-box-sizing: inherit;
            box-sizing: inherit
        }

        .jptb-top-panel::after,
        .jptb-top-panel::before {
            -webkit-box-sizing: inherit;
            box-sizing: inherit
        }

        .jptb-top-panel a {
            color: inherit;
            text-decoration: none
        }

        .jptb-top-panel .jptb-wrap {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between
        }

        .jptb-top-panel .jptb-left {
            padding-right: 13px;
            margin-bottom: 17px
        }

        .jptb-top-panel .jptb-right {
            margin-bottom: 17px;
            padding-left: 13px;
            text-align: right
        }

        .jptb-top-panel .jptb-center {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            position: relative;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-animation-direction: alternate;
            animation-direction: alternate;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
            will-change: transform
        }

        .jptb-top-panel .jptb-center .jptb-jackpot-item {
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            margin-bottom: 17px;
            padding: 0 8px
        }

        .jptb-top-panel .jptb-center .jptb-jackpot-currency {
            padding-left: 5px
        }

        .jptb-top-panel .jptb-center .jptb-jackpot-item .jptb-jackpot-name {
            margin-right: 8px
        }

        .jptb-top-panel .jptb-center .jptb-jackpot-item .jptb-jackpot-counter {
            position: relative;
            font-size: 19px
        }

        .jptb-top-panel .jptb-center .jptb-jackpot-item .jptb-jackpot-counter-wrapper {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            background-color: #222;
            background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(200, 200, 200, .2)), color-stop(40%, rgba(200, 200, 200, .2)), color-stop(45%, #000), to(#000));
            background-image: linear-gradient(to bottom, rgba(200, 200, 200, .2) 0, rgba(200, 200, 200, .2) 30%, #000 50%, #000 100%);
            overflow: hidden
        }

        .jptb-top-panel .jptb-center .jptb-jackpot-item .jptb-jackpot-counter-cell {
            position: relative;
            -webkit-transform: rotateX(-2deg);
            transform: rotateX(-2deg);
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d
        }

        .jptb-top-panel .jptb-center .jptb-jackpot-item .jptb-jackpot-counter-cell>div {
            margin: 0 auto;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
            -webkit-transition-delay: .5s;
            transition-delay: .5s;
            -webkit-transition-duration: 0s;
            transition-duration: 0s;
            -webkit-transition-property: -webkit-transform;
            transition-property: -webkit-transform;
            transition-property: transform;
            transition-property: transform, -webkit-transform;
            -webkit-transition-timing-function: cubic-bezier(.7, .16, .3, .84);
            transition-timing-function: cubic-bezier(.7, .16, .3, .84);
            will-change: transform
        }

        .jptb-top-panel .jptb-center .jptb-jackpot-item .jptb-jackpot-counter-cell .jptb-plane {
            position: absolute;
            color: #fbea5e;
            line-height: 1;
            text-align: center;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden
        }

        .jptb-top-panel.full-rotation .jptb-wrap {
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center
        }

        .jptb-top-panel.jptb-hitted {
            opacity: 1
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-jackpot-item {
            display: none
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-jackpot-item.jptb-hit {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-left-lamps,
        .jptb-top-panel.jptb-hitted .jptb-center .jptb-right-lamps {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-lamp {
            background-image: url(https://www.infernoslots.net/assets/img/jackpot/lamp_off.png);
            background-position: 50% 50%;
            background-size: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            will-change: background-image
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-left-lamps .jptb-lamp:nth-last-child(4n+1) {
            -webkit-animation: lamps .4s .1s infinite;
            animation: lamps .4s .1s infinite
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-left-lamps .jptb-lamp:nth-last-child(4n+2) {
            -webkit-animation: lamps .4s .2s infinite;
            animation: lamps .4s .2s infinite
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-left-lamps .jptb-lamp:nth-last-child(4n+3) {
            -webkit-animation: lamps .4s .3s infinite;
            animation: lamps .4s .3s infinite
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-left-lamps .jptb-lamp:nth-last-child(4n+4) {
            -webkit-animation: lamps .4s .4s infinite;
            animation: lamps .4s .4s infinite
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-right-lamps .jptb-lamp:nth-child(4n+1) {
            -webkit-animation: lamps .4s .1s infinite;
            animation: lamps .4s .1s infinite
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-right-lamps .jptb-lamp:nth-child(4n+2) {
            -webkit-animation: lamps .4s .2s infinite;
            animation: lamps .4s .2s infinite
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-right-lamps .jptb-lamp:nth-child(4n+3) {
            -webkit-animation: lamps .4s .3s infinite;
            animation: lamps .4s .3s infinite
        }

        .jptb-top-panel.jptb-hitted .jptb-center .jptb-right-lamps .jptb-lamp:nth-child(4n+4) {
            -webkit-animation: lamps .4s .4s infinite;
            animation: lamps .4s .4s infinite
        }

        @-webkit-keyframes lamps {
            5% {
                background-image: url(https://www.infernoslots.net/assets/img/jackpot/lamp_off.png)
            }

            30% {
                background-image: url(https://www.infernoslots.net/assets/img/jackpot/lamp_on.png)
            }

            95% {
                background-image: url(https://www.infernoslots.net/assets/img/jackpot/lamp_off.png)
            }
        }

        @keyframes lamps {
            5% {
                background-image: url(https://www.infernoslots.net/assets/img/jackpot/lamp_off.png)
            }

            30% {
                background-image: url(https://www.infernoslots.net/assets/img/jackpot/lamp_on.png)
            }

            95% {
                background-image: url(https://www.infernoslots.net/assets/img/jackpot/lamp_off.png)
            }
        }

        .jptb-top-panel.jptb-hide-sidebars .jptb-left,
        .jptb-top-panel.jptb-hide-sidebars .jptb-right {
            display: none
        }

        .jptb-jackpot-counter-cell:nth-last-child(2)::before {
            display: block;
            position: absolute;
            content: '\002E';
            left: -17%;
            bottom: 8%
        }

        .jptb-animation {
            position: relative;
            z-index: 1001;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #04010c;
            background-image: radial-gradient(ellipse at center, transparent 0, transparent 45%, #04010c 100%), url(https://www.infernoslots.net/assets/img/jackpot/bg.jpg);
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
            font-family: DinPro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
            overflow: hidden
        }

        .jptb-animation-container {
            position: absolute;
            top: 50%;
            left: 50%;
            max-width: 100%;
            max-height: 100%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%)
        }

        .jptb-animation-light1 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            max-width: 1114px;
            height: 100%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            background: url(https://www.infernoslots.net/assets/img/jackpot/light_1.png) 50% 50%/contain no-repeat;
            -webkit-animation: rotating-360 5s linear infinite;
            animation: rotating-360 5s linear infinite;
            will-change: transform
        }

        .jptb-animation-light2 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            max-width: 997px;
            height: 50%;
            -webkit-transform: scale(3.2) translate(-50%, -50%);
            transform: scale(3.2) translate(-50%, -50%);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            background: url(https://www.infernoslots.net/assets/img/jackpot/light_2.png) 50% 50%/contain no-repeat;
            -webkit-animation: scaling-light 5s linear infinite alternate;
            animation: scaling-light 5s linear infinite alternate;
            will-change: transform
        }

        .jptb-animation-wrap {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 144%;
            height: 100%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-animation: appear .4s linear 1;
            animation: appear .4s linear 1
        }

        .jptb-animation-coins {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 85%;
            max-width: 1319px;
            height: 85%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            background: url(https://www.infernoslots.net/assets/img/jackpot/coins.png) 50% 50%/contain no-repeat;
            -webkit-animation: scale-rotate 4.6s linear .4s 2 alternate;
            animation: scale-rotate 4.6s linear .4s 2 alternate
        }

        .jptb-animation-jackpot {
            position: absolute;
            top: 15%;
            left: 50%;
            width: 55%;
            max-width: 1021px;
            height: 55%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            background: url(https://www.infernoslots.net/assets/img/jackpot/jackpot-white.png) 50% 0/contain no-repeat
        }

        .jptb-animation-table {
            position: absolute;
            top: 33%;
            left: 50%;
            width: 65%;
            max-width: 716px;
            height: 45%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            background: url(https://www.infernoslots.net/assets/img/jackpot/Table.png) 50% 0/contain no-repeat;
            color: #fff;
            line-height: 1.4;
            text-align: center;
            text-transform: uppercase;
            -webkit-animation: table-appear .3s linear 1;
            animation: table-appear .3s linear 1
        }

        .jptb-animation-amount {
            position: relative;
            top: 21%;
            left: 50%;
            width: 72%;
            height: 16%;
            margin-bottom: 24%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            font-size: 3.875em;
            -webkit-animation: text-appear 5s linear 1;
            animation: text-appear 5s linear 1;
            will-change: opacity
        }

        .jptb-animation-amount span {
            position: absolute
        }

        .jptb-animation-amount span:first-child {
            left: 3%
        }

        .jptb-animation-amount span:last-child {
            right: 3%
        }

        .jptb-animation-counter {
            font-size: 2.8125em;
            text-transform: uppercase;
            -webkit-animation: text-appear 5s linear 1;
            animation: text-appear 5s linear 1;
            will-change: opacity
        }

        .jptb-animation-continue,
        .jptb-animation-continue:visited {
            position: absolute;
            bottom: 1%;
            left: 50%;
            width: 45%;
            max-width: 350px;
            max-height: 87px;
            border: 0;
            text-align: center;
            text-decoration: none;
            border-radius: 100px;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            -webkit-transition: background-color .5s;
            transition: background-color .5s;
            background-color: rgba(24, 19, 13, .75);
            color: #fbea5e;
            font-family: inherit;
            font-size: 1.875em;
            line-height: 2.94446;
            text-transform: uppercase;
            -webkit-animation: button-appear 5s linear 1;
            animation: button-appear 5s linear 1;
            cursor: pointer;
            will-change: opacity
        }

        .jptb-animation-continue:focus {
            outline: 0
        }

        .jptb-animation-continue:hover {
            background-color: rgba(255, 249, 244, .5)
        }

        .jptb-win {
            position: relative;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            z-index: 1000
        }

        @-webkit-keyframes rotating-360 {
            0% {
                -webkit-transform: rotate(0) translate(-50%, -50%);
                transform: rotate(0) translate(-50%, -50%)
            }

            100% {
                -webkit-transform: rotate(360deg) translate(-50%, -50%);
                transform: rotate(360deg) translate(-50%, -50%)
            }
        }

        @keyframes rotating-360 {
            0% {
                -webkit-transform: rotate(0) translate(-50%, -50%);
                transform: rotate(0) translate(-50%, -50%)
            }

            100% {
                -webkit-transform: rotate(360deg) translate(-50%, -50%);
                transform: rotate(360deg) translate(-50%, -50%)
            }
        }

        @-webkit-keyframes scaling-light {
            0% {
                -webkit-transform: scale(1) translate(-50%, -50%);
                transform: scale(1) translate(-50%, -50%)
            }

            5% {
                -webkit-transform: scale(1.7) translate(-50%, -50%);
                transform: scale(1.7) translate(-50%, -50%)
            }

            25% {
                -webkit-transform: scale(1.7) translate(-50%, -50%);
                transform: scale(1.7) translate(-50%, -50%)
            }

            100% {
                -webkit-transform: scale(3.2) translate(-50%, -50%);
                transform: scale(3.2) translate(-50%, -50%)
            }
        }

        @keyframes scaling-light {
            0% {
                -webkit-transform: scale(1) translate(-50%, -50%);
                transform: scale(1) translate(-50%, -50%)
            }

            5% {
                -webkit-transform: scale(1.7) translate(-50%, -50%);
                transform: scale(1.7) translate(-50%, -50%)
            }

            25% {
                -webkit-transform: scale(1.7) translate(-50%, -50%);
                transform: scale(1.7) translate(-50%, -50%)
            }

            100% {
                -webkit-transform: scale(3.2) translate(-50%, -50%);
                transform: scale(3.2) translate(-50%, -50%)
            }
        }

        @-webkit-keyframes appear {
            0% {
                -webkit-transform: scale(.01) translate(-50%, -50%);
                transform: scale(.01) translate(-50%, -50%)
            }

            100% {
                -webkit-transform: scale(1) translate(-50%, -50%);
                transform: scale(1) translate(-50%, -50%)
            }
        }

        @keyframes appear {
            0% {
                -webkit-transform: scale(.01) translate(-50%, -50%);
                transform: scale(.01) translate(-50%, -50%)
            }

            100% {
                -webkit-transform: scale(1) translate(-50%, -50%);
                transform: scale(1) translate(-50%, -50%)
            }
        }

        @-webkit-keyframes table-appear {
            0% {
                -webkit-transform: scale(.01) translateX(-50%);
                transform: scale(.01) translateX(-50%)
            }

            100% {
                -webkit-transform: scale(1) translate(-50%);
                transform: scale(1) translate(-50%)
            }
        }

        @keyframes table-appear {
            0% {
                -webkit-transform: scale(.01) translateX(-50%);
                transform: scale(.01) translateX(-50%)
            }

            100% {
                -webkit-transform: scale(1) translate(-50%);
                transform: scale(1) translate(-50%)
            }
        }

        @-webkit-keyframes text-appear {
            0% {
                opacity: 0
            }

            10% {
                opacity: 1
            }

            100% {
                opacity: 1
            }
        }

        @keyframes text-appear {
            0% {
                opacity: 0
            }

            10% {
                opacity: 1
            }

            100% {
                opacity: 1
            }
        }

        @-webkit-keyframes button-appear {
            0% {
                opacity: 0
            }

            18% {
                opacity: 0
            }

            24% {
                opacity: 1
            }

            100% {
                opacity: 1
            }
        }

        @keyframes button-appear {
            0% {
                opacity: 0
            }

            18% {
                opacity: 0
            }

            24% {
                opacity: 1
            }

            100% {
                opacity: 1
            }
        }

        @-webkit-keyframes scale-rotate {
            0% {
                -webkit-transform: rotate(0) scale(1) translate(-50%, -50%);
                transform: rotate(0) scale(1) translate(-50%, -50%)
            }

            100% {
                -webkit-transform: rotate(10deg) scale(1.12) translate(-50%, -50%);
                transform: rotate(10deg) scale(1.12) translate(-50%, -50%)
            }
        }

        @keyframes scale-rotate {
            0% {
                -webkit-transform: rotate(0) scale(1) translate(-50%, -50%);
                transform: rotate(0) scale(1) translate(-50%, -50%)
            }

            100% {
                -webkit-transform: rotate(10deg) scale(1.12) translate(-50%, -50%);
                transform: rotate(10deg) scale(1.12) translate(-50%, -50%)
            }
        }

        .jptb-hidden {
            display: none
        }

        @media(min-width:598px) {
            .jptb-animation-table {
                min-width: 708px;
                min-height: 441px
            }
        }

        @media(max-width:597px) {
            .jptb-animation-counter {
                font-size: 1.8125em
            }

            .jptb-animation-amount {
                font-size: 2.875em
            }

            .jptb-animation-table {
                min-width: 450px
            }
        }
    </style>
    <!-- WAE -->
    <div id="daily_win_wheel_holder">
        <h1>DAILY FREE WHEEL ENTRY</h1>
        <div id="daily_win_wheel"></div>
    </div>
    <div id="jackpot_spin">
        <div class="spinner" id="the_spinner"></div>
    </div>
    <div class="spin_overlay"></div>
    <style type="text/css">
        @keyframes bounce-5 {
            0% {
                transform: scale(1, 1) translateY(0);
            }

            10% {
                transform: scale(1.1, 0.9) translateY(0);
            }

            30% {
                transform: scale(0.9, 1.1) translateY(-20px);
            }

            50% {
                transform: scale(1, 1) translateY(0);
            }

            57% {
                transform: scale(1, 1) translateY(-7px);
            }

            64% {
                transform: scale(1, 1) translateY(0);
            }

            100% {
                transform: scale(1, 1) translateY(0);
            }
        }

        #dailyWheelToggle {
            max-width: 35px;
            align-self: flex-end;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            height: 40px;
            margin: 0 auto 0 auto;
            transform-origin: bottom;
            width: 40px;
            animation-name: bounce-5;
            animation-timing-function: ease;
            position: fixed;
            bottom: 0;
            right: 30px;
            cursor: pointer;
        }

        #dailyWheelToggle video {
            max-width: 100%;
            height: auto;
        }

        #daliy_win_bar {
            position: fixed;
            bottom: 0;
            z-index: 9997;
            right: 30px;
        }

        #daliy_win_bar.show {
            display: block;
            right: 0;
        }

        #close_dw_bar {
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            max-width: 10px;
            background: #8c0909;
            padding: 8px;
            border-radius: 100%;
            line-height: 0;
            z-index: 9998;
        }

        #daliy_win_holder {
            display: inline-block;
            max-width: 150px;
            min-width: 150px;
            text-align: center;
        }

        #daliy_win_img {
            max-width: 85%;
            cursor: pointer;
        }

        #daliy_win_band {
            position: absolute;
            bottom: 5%;
            cursor: pointer;
        }

        #daliy_win_band span {
            color: #fff;
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            white-space: nowrap;
            font-weight: 600;
        }

        #daily_win_wheel_holder h1 {
            font-size: 5vw;
            margin: 115px auto 0;
            color: #fff;
            text-align: center;
        }

        #daily_win_wheel_holder {
            top: 0;
            z-index: 999999;
            position: fixed;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
        }

        #daily_win_wheel_holder.show {
            display: block;
        }

        #dwinAnimation {
            display: none;
            width: 100%;
            height: 100%;
            top: 0;
        }

        #dwinAnimation.show,
        #daily_win_wheel_holder.show {
            display: block;
        }

        #w_spin-button {
            width: 30%;
            height: 30%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 13px;
            color: #fff;
            cursor: pointer;
            background-image: url(https://www.infernoslots.net/assets/spinner/button.png);
            background-size: contain;
            background-repeat: no-repeat;
        }

        #w_spin-button.spin-button:hover {
            background-image: url(https://www.infernoslots.net/assets/spinner/button_pressed.png), url(https://www.infernoslots.net/assets/spinner/button.png);
        }

        #w_spin-button:after {
            content: "SPIN";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 30px;
        }

        #w_wheel_holder {
            background: url(https://www.infernoslots.net/assets/spinner/wheel_border.png);
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
        }

        #daily_win_wheel .eWheel-marker {
            background: url(https://www.infernoslots.net/assets/spinner/marker.png);
            background-size: 60%;
            background-repeat: no-repeat;
            background-position: center bottom;
            height: 25%;
        }

        #daily_win_wheel .eWheel-marker svg {
            display: none;
        }

        #w_wheel_border {
            width: 100%;
            height: 100%;
            top: 7px;
            left: 1px;
            position: relative;
        }

        #w_wheel_border img {
            display: block;
            width: 100%;
        }

        #w_wheel_border span {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 3.9em;
            height: 4em;
            margin: -2em;
        }

        #w_wheel_border img.wheel_lights.hide {
            display: none;
        }

        #dwinAnimation .jptb-animation-jackpot {
            background: url(https://www.infernoslots.net/assets/img/spinner/dw_winscreen.png) 50% 0/contain no-repeat
        }

        #dw_error {
            position: fixed;
            z-index: 999999999;
            top: 0;
            width: 100%;
            height: 100%;
            background: #000000b5;
        }

        #dw_message {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            background: #000;
            padding: 20px;
            color: #fff;
        }

        #dw_message p:first-child {
            font-size: 2vw;
        }

        #dw_message p:last-child {
            font-size: 1.5vw;
        }

        #dw_error i {
            font-size: 20px;
            position: absolute;
            top: 30px;
            right: 30px;
            cursor: pointer;
        }

        @media(max-width: 1024px) {
            #dw_message {
                width: 100%;
            }

            #dw_message p:first-child {
                font-size: 150%;
            }

            #dw_message p:last-child {
                font-size: 120%;
            }
        }

        #jackpot_spin {
            top: 0;
            z-index: 9999;
            position: fixed;
            width: 100%;
            height: 100%;
            background: #0009;
            display: none;
        }

        .spin_overlay {
            position: fixed;
            z-index: 9998;
            opacity: 0.7;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: #000;
            display: none;
        }

        #winAnimation {
            display: none;
            width: 100%;
            height: 100%;
            top: 0;
        }

        #winAnimation.show,
        #jackpot_spin.show,
        .spin_overlay.show {
            display: block;
        }

        #winner_alert h2 {
            color: #fff;
        }

        #winner_alert h3 {
            width: 120px;
            left: 0;
            border-radius: 5px;
            background: rgb(255, 255, 255);
            z-index: 9999;
            color: #000;
            text-align: center;
            margin: auto;
            padding: 15px 0;
            cursor: pointer;
        }

        #j_spin-button {
            width: 30%;
            height: 30%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 13px;
            color: #fff;
            cursor: pointer;
            background-image: url(https://www.infernoslots.net/assets/spinner/button.png);
            background-size: contain;
            background-repeat: no-repeat;
        }

        #j_spin-button.spin-button:hover {
            background-image: url(https://www.infernoslots.net/assets/spinner/button_pressed.png), url(https://www.infernoslots.net/assets/spinner/button.png);
        }

        #j_spin-button:after {
            content: "SPIN";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 30px;
        }

        #j_wheel_holder {
            background: url(https://www.infernoslots.net/assets/spinner/wheel_border.png);
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
        }

        #the_spinner .eWheel-marker {
            background: url(https://www.infernoslots.net/assets/spinner/marker.png);
            background-size: 60%;
            background-repeat: no-repeat;
            background-position: center bottom;
            height: 25%;
        }

        #the_spinner .eWheel-marker svg {
            display: none;
        }

        #j_wheel_border {
            width: 100%;
            height: 100%;
            top: 7px;
            left: 1px;
            position: relative;
        }

        #j_wheel_border img {
            display: block;
            width: 100%;
        }

        #j_wheel_border span {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 3.9em;
            height: 4em;
            margin: -2em;
        }

        #j_wheel_border img.j_wheel_lights.hide {
            display: none !important;
        }
    </style>
    <script src="Infornojs/jquery.mask.min.js"></script>
    <style type="text/css">
        #sideTabs {
            position: fixed;
            left: 0;
            bottom: 30px;
        }

        #sideTabs ul {
            padding: 0;
        }

        #sideTabs ul li {
            width: 30px;
            line-height: 0;
            padding: 5px 20px;
            background: #000;
            cursor: pointer;
        }

        #sideTabs ul li.sideTabAction {
            padding: 20px;
        }

        #sideTabs ul li.sideTabToggle {
            border-top-right-radius: 5px;
        }

        #sideTabs ul li.sideTabToggle.close,
        #sideTabs ul li:last-child {
            border-bottom-right-radius: 5px;
        }

        #sideTabs ul li>img {
            max-width: 80%;
        }

        #sideTabs ul li.sideTabToggle img {
            transition: transform 0.8s;
            transform-style: preserve-3d;
        }

        #sideTabs ul li.sideTabToggle.close img {
            transform: rotateY(180deg);
        }

        /*ref */
        #referal_system_home {
            position: fixed;
            bottom: 0;
            background: #fff;
            width: 800px;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            font-size: 18px;
            font-weight: 500;
            z-index: 9999;
        }

        #ref_agreement {
            text-align: center;
            line-height: 0;
        }

        #ref_agreement img {
            max-width: 80px;
        }

        .rf_code_wrap {
            width: 70%;
            margin: auto;
            border: 2px dotted;
            display: table;
            border-radius: 5px;
            padding: 5px 0;
        }

        .rf_code_wrap>div {
            min-width: 50%;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }

        #the_code {
            font-size: 30px;
            padding: 15px 0;
        }

        .rf_code_wrap>div>a {
            background: #00bb5d;
            padding: 7px;
            border-radius: 5px;
            color: #fff;
            text-decoration: none;
        }

        .clipBoard {
            width: 20px;
            height: 20px;
            display: inline-block;
            background-size: cover;
        }

        .clipBoard.copied {
            transition: transform 0.8s;
            transform-style: preserve-3d;
            transform: rotateY(180deg);
            background-image: url(https://www.infernoslots.net/assets/img/copied.svg) !important;
        }

        #phone_verification_home {
            position: fixed;
            bottom: 0;
            z-index: 9999;
            background: #fff;
            color: #000;
            border-radius: 5px;
            padding: 10px;
            overflow-y: auto;
            max-width: 900px;
            max-height: 100%;
        }

        #phone_verification_home .row.noti {
            display: flex;
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
        }

        #phone_verification_home .col-md-12 {
            width: 100%;
        }

        #phone_verification_home .col-md-6 {
            width: calc((1 / 2) * 100%);
            padding: 10px;
            box-sizing: border-box;
        }

        #phone_verification_noti>div .form_loder * {
            text-align: center;
        }

        #phone_verification_noti input {
            max-width: 100%;
            background: #050b25;
            font-size: 20px;
            padding: 10px 0;
            text-align: center;
            color: #fff;
            border-radius: 50px;
            border: 2px solid #02104d;
            -webkit-box-shadow: 0px 2px 5px 3px rgba(19, 29, 119, 1);
            -moz-box-shadow: 0px 2px 5px 3px rgba(19, 29, 119, 1);
            box-shadow: 0px 2px 5px 3px rgba(19, 29, 119, 1);
        }

        .varification_number_pad {
            max-width: 295px;
            margin: auto;
        }

        .varification_number_pad ul {
            display: flex;
            position: relative;
            flex-direction: row;
            flex-wrap: wrap;
            vertical-align: middle;
            align-items: center;
            justify-content: center;
            padding: 0 15px;
        }

        .varification_number_pad li {
            width: calc((1 / 3) * 100%);
            padding: 10px;
            border-radius: 16px;
            display: block !important;
            margin: 3.5px 0 !important;
            box-sizing: border-box;
        }

        .varification_number_pad li div {
            width: 100%;
            height: 0;
            padding-top: 100%;
            border: 1.5px solid #000;
            display: block;
            border-radius: 50%;
            text-align: center;
            position: relative;
            color: #000;
            margin: auto;
            background: transparent;
            cursor: pointer;
        }

        .varification_number_pad li div:hover {
            -webkit-box-shadow: inset 0px 0px 15px 5px rgba(0, 0, 0, 1);
            -moz-box-shadow: inset 0px 0px 15px 5px rgba(0, 0, 0, 1);
            box-shadow: inset 0px 0px 15px 5px rgba(0, 0, 0, 1);
        }

        .varification_number_pad li div:active {
            -webkit-box-shadow: inset 0px 0px 15px 5px rgb(84, 84, 84);
            -moz-box-shadow: inset 0px 0px 15px 5px rgb(84, 84, 84);
            box-shadow: inset 0px 0px 15px 5px rgb(84, 84, 84);
        }

        .varification_number_pad li div span {
            font-size: 35px;
            position: absolute;
            top: 50%;
            left: 50%;
            font-weight: 500;
            transform: translate(-50%, -50%);
            line-height: 0;
        }

        .col-md-6.div_holder {
            float: left;
        }

        .col-md-6.left.div_holder {
            text-align: right;
        }

        .col-md-6.right.div_holder {
            text-align: left;
        }

        #phone_verification_noti .div_holder div,
        #phone_verification_noti input[type=submit] {
            font-size: 25px;
            color: #fff;
            border: navajowhite;
            padding: 15px 30px;
            margin-top: 20px;
            border-radius: 50px;
            text-align: center;
            max-width: 260px;
            margin: auto;
            cursor: pointer;
        }

        .skip_verification {
            background: #dc4141;
        }

        #do_verification,
        #phone_verification_noti input[type=submit] {
            background: #8ac88a;
        }

        #phone_verification_noti .div_holder div#int_verification {
            margin-top: 0px !important;
            background: #41a241;
        }

        #phone_verification_home_scroll {
            display: none;
        }

        @media(max-width: 768px) {
            #referal_system_home {
                bottom: 10px;
                top: 10px;
                right: 10px;
                width: auto;
            }

            .rf_code_wrap>div {
                min-width: 100%;
                display: block;
                margin-bottom: 20px;
                vertical-align: middle;
                text-align: center;
            }

            #phone_verification_home {
                position: fixed;
                bottom: 10px;
                top: 10px;
                right: 10px;
                width: auto;
                padding: 10px 20px;
            }

            #phone_verification_home .col-md-6 {
                width: 100%;
            }

            #phone_verification_home_scroll {
                position: fixed;
                width: calc((1/18) *100%);
                border: 1px solid;
                border-radius: 100%;
                transition: transform 0.8s;
                transform-style: preserve-3d;
                transform: rotate(90deg);
                right: 15px;
                bottom: 30px;
                display: block;
            }

            #phone_verification_home_scroll.down {
                transform: rotate(-90deg);
            }
        }
    </style>
    <div id="gameBeforeThis" style="display: none;opacity: 0;height: 0;width: 0"></div>
    <div id="overlay" class=""></div>
    <div id="loader" class="">
        <img src="https://www.infernoslots.net/assets/img/reload.svg">
    </div>
    <div id="disclaimer" style="display:none">
        <div>
            <h1> Double Down Bonus </h1>
            <div>If double down bonus is selected during the transaction the amount the player deposits gets doubled.
                Players must 10x the total bonus amount. If a player deposits 10 they get another 10 added to their
                balance and to redeem they must have at least 100. No deposits are allowed during bonus and the bonus is
                automatically reset hourly. Deposits are allowed once balance is below 1.00, Cancel any time before
                starting the bonus round.</div>
            <div>
                <a href="javascript:void(0)" id="accept_terms" data-agree="?to=double_down_agreed">Accept</a>
                <a href="https://infernoslots.net/?logout" onclick="clearInterval(logCheck)">Decline</a>
            </div>
        </div>
    </div>

    <style type="text/css">
        #disclaimer {
            position: fixed;
            z-index: 99999999;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000000bf;
        }

        #disclaimer>div {
            position: absolute;
            width: 550px;
            max-width: 90%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #000;
            background-color: #fff;
            text-align: center;
            border-radius: 10px;
            padding: 15px;
        }

        #disclaimer>div>div {
            margin-bottom: 25px;
        }

        #disclaimer a {
            color: #fff;
            background: #3db33d;
            font-weight: bold;
            font-size: 20px;
            padding: 15px;
            border-radius: 10px;
            text-decoration: none;
        }

        #disclaimer>div>div>a:last-child {
            background-color: red;
        }
    </style>
    <script type="text/javascript">
        $('#accept_terms').on('click', function() {
            var go_to = $(this).data("agree");
            $.post(site_url + "/user_actions/acceptAgreement.php" + go_to, function(data) {
                $('#disclaimer').remove();
            }, 'json');
        })

        function show_disclaimer() {
            $('#disclaimer').slideDown();
        }
    </script>

</body>

</html>