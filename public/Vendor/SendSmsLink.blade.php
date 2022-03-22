<header>
    <div class="topbar-left">
        <button class="menu-bar" ng-click="toggleMenu()"><i class="fas fa-bars"></i></button>
        <p class="logo">
            <i class="fas fa-angle-left"></i><i class="fas fa-angle-left"></i>
            <span> Renonights</span> <i class="fas fa-angle-right"></i><i class="fas fa-angle-right"></i>
        </p>
        <p>Reports</p>
    </div>
    <div class="topbar-right">
        <div class="logindetails">
            You logged in as
        </div>
        <div class="user">
            <div style=" margin-right:50px"><%uname%></div>
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
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#!accounthistory">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Player history</span>
                    </a>
                </li>
                <li>
                    <a href="#!transctionhistory">
                        <i class="fas fa-search"></i>
                        <span>Vendor history</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-book"></i>
                        <span>Download Link</span>
                    </a>
                </li>
                <li>
                    <a href="#!SendSmsLink">
                        <i class="fas fa-envelope"></i>
                        <span>SMS Link</span>
                    </a>
                </li>
                <li>
                    <a href="#!accountdispute">
                        <i class="fas fa-envelope"></i>
                        <span>Dispute</span>
                    </a>
                </li>
                <hr />
                <li>
                    <a title="Logout" style=" margin-right:30px" href="logoutself" style="font-size:15px; color:black; float:right; margin-right: 60px">
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
        <div class="content-top shadow">

        </div>

        <div class="data-table">


        </div>
    </div>
</div>