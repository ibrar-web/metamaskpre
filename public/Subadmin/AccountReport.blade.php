<header>
    <div class="topbar-left">
        <button class="menu-bar" ng-click="toggleMenu()"><i class="fas fa-bars"></i></button>
        <p class="logo">
            <i class="fas fa-angle-left"></i><i class="fas fa-angle-left"></i>
            <span> River</span> <i class="fas fa-angle-right"></i><i class="fas fa-angle-right"></i>
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
                        <span>Accounts Management</span>
                    </a>
                </li>
                <li>
                    <a href="#!accounthistory">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Account history</span>
                    </a>
                </li>
                <li>
                    <a href="#!transctionhistory">
                        <i class="fas fa-search"></i>
                        <span>Transactions history</span>
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
        <div class="content-top shadow">

            <div class="input-wrapper">
                <label for="deposit-amount">From </label>
                <div class="input-holder">
                    <input type="date" ng-model="from" />
                </div>
            </div>
            <div class="input-wrapper">
                <label for="deposit-amount">Untill</label>
                <div class="input-holder">
                    <input type="date" ng-model="till" />
                </div>
            </div>
            <div class="btn-wrapper">
                <button class="btn btn-blue" ng-click="filterdata()">Apply Filter</button>
                <button class="btn btn-gray" ng-click="reset()">Reset Filter</button>
                <button class="btn btn-gray" ng-click="print()">Print</button>
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
                        <th>Date</th>
                        <th>Account#</th>
                        <th>Deposit</th>
                        <th>Bounceback</th>
                        <th>Redeems</th>
                        <th>Profit</th>
                        <th>Payout</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="(key,item) in pagedItems[currentPage] | filter:test">
                        <th class="name"><%item.created_at%></th>
                        <th class="user-id">
                            <span><%item.account%></span>
                        </th>
                        <th class="name"><%item.deposit%></th>
                        <th class="credit"><%item.Bounceback%></th>
                        <th class="name"><%item.Redeems%></th>
                        <th class="name"><%item.profit%></th>
                        <th class="names"><%item.payout%></th>
                    </tr>
                    <tr>
                        <th class="name">Total</th>
                        <th class="user-id">

                        </th>
                        <th class="name"><%deposit%></th>
                        <th class="credit"><%Bounceback%></th>
                        <th class="name"><%Redeems%></th>
                        <th class="name"><%profit%></th>
                        <th class="names"><%payout%></th>
                    </tr>
                </tbody>
            </table>
            <div class="tablenew">
                <div class="tablehead">
                    <div>Date</div>
                    <div>Account#</div>
                    <div>Deposit</div>
                    <div>Bounceback</div>
                </div>

                <div class="tablebody" ng-repeat="(key,item) in pagedItems[currentPage] | filter:test">
                    <div class="tablebody1">
                        <div class="name"><%item.created_at%></div>
                        <div class="user-id">
                            <span ng-click="copyToClipboard(item.username);"><%item.account%></span>
                        </div>
                        <!--<i class="fas fa-copy"></i>-->
                        <div class="name"><%item.deposit%></div>

                        <div class="credit"><span><%item.Bounceback%></div>
                        <div><i class="fas fa-ellipsis-v" ng-model="item.id" ng-click="item.id?item.id=false:item.id=true"></i></div>
                    </div>
                    <div class="tableaction" ng-if="!item.id">
                        <div class="name"><%item.Redeems%></div>
                        <div class="name"><%item.profit%></div>
                        <div class="name"><%item.payout%></div>
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