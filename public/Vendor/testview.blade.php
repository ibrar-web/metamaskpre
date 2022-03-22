<header>
    <div class="topbar-left">
        <button class="menu-bar" ng-click="toggleMenu()"><i class="fas fa-bars"></i></button>
        <p class="logo">
            <i class="fas fa-angle-left"></i><i class="fas fa-angle-left"></i>
            <span> Renonights</span> <i class="fas fa-angle-right"></i><i class="fas fa-angle-right"></i>
        </p>

    </div>
    <div class="topbar-right">
        You logged in as
        <div class="user">
            <div style=" margin-right:50px"><%uname%></div>
        </div>
        <i class="fas fa-sort-down"></i>
    </div>
</header>
<div class="main-wrapper">
    <div class="sidebar">
        <div class="close" ng-click="toggleMenu()">
            <button><i class="fas fa-times"></i></button>
        </div>
        <div class="sidebar-top shadow">
            Your points: <b> <%c.amount%></b>
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
                        <span>Account history</span>
                    </a>
                </li>
                <li>
                    <a href="#!transctionhistory">
                        <i class="fas fa-search"></i>
                        <span>Vendor history</span>
                    </a>
                </li>
                <hr />
                <p class="list-title">RIVER APP</p>
                <li>
                    <a href="#">
                        <i class="fas fa-book"></i>
                        <span>Download Link</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-envelope"></i>
                        <span>SMS Link</span>
                    </a>
                </li>
                <li>
                    <a href="#">
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
        <div class="message"><%alertmessage%></div>
        <div class="content-top shadow">
            <form>
                <div class="input-wrapper">
                    <label for="deposit-amount">Deposit Amount</label>
                    <div class="input-holder">
                        <input type="number" placeholder="0.00" ng-model="register.balance" />
                    </div>
                </div>
                <div class="input-wrapper">
                    <label for="deposit-amount">Username/Notes</label>
                    <div class="input-holder">
                        <input type="text" placeholder="username" ng-model="register.name" />
                    </div>
                </div>
                <div class="input-wrapper">
                    <label for="deposit-amount">Bounceback</label>
                    <input type="checkbox" />
                </div>
                <div class="btn-wrapper">
                    <button class="btn btn-blue" ng-click="registervendro('create')">Create account</button>
                    <button class="btn btn-gray">Cancel</button>
                </div>
            </form>
        </div>

        <div class="data-table">
            <div class="searchbar" style="display: flex">
                <div class="searchbar1" style="width:50%">
                    <div class="items">Show
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
                </div>
                <div class="searchbar2">
                    <div>Search : <input type="text" placeholder="Search Here" ng-model="test"></div>
                </div>
            </div>
            <div class="tablenew">
                <div class="tablehead">
                    <div>Account#</div>
                    <div>Name</div>
                    <div>Created</div>
                    <div>Balance</div>
                </div>

                <div class="tablebody" ng-repeat="(key,item) in pagedItems[currentPage] | filter:test">
                    <div class="tablebody1">
                        <div class="user-id">
                            <span><%item.username%></span>
                        </div>
                        <!--<i class="fas fa-copy"></i>-->
                        <div class="name"><%item.name%></div>
                        <div class="name"><%item.created_at%></div>
                        <div class="credit"><span><%item.amount%></span>/<span><%item.reward%></span>
                        </div>
                        <div><i class="fas fa-ellipsis-v" ng-model="item.id" ng-click="item.id?item.id=false:item.id=true"></i></div>
                    </div>
                    <div class="tableaction" ng-if="!item.id">
                        <div ng-class="{Online:'state2', Offline:'state'}[item.status]"><%item.status%></div>
                        <div>
                            <button class="btn btn-light" title="Add Credit" ng-click="crud(item,'credit')" data-toggle="modal" data-target="#exampleModal5">Deposite</button><button class="btn btn-light" title="With Drawal Credit" ng-click="crud(item,'redeem')" data-toggle="modal" data-target="#exampleModal5">Redeem</button>
                        </div>
                        <div>
                            <button ng-class="{1:'btn btn-light', 0:'revert'}[item.revert]" class="" title="Revert Credit" ng-click="crud(item,'revert')" data-toggle="modal" data-target="#exampleModal1">Reverse</button>
                        </div>
                        <div ng-class="{active:'lock', ban:'state'}[item.ban]"><i class="fas fa-lock" title="Change Pass" ng-click="crud(item,'ban')" data-toggle="modal" data-target="#exampleModal2"></i></div>
                        <div class="deposit-redeem ">
                            <button class="redeem" title="Change Pass" ng-click="crud(item,'pass')" data-toggle="modal" data-target="#exampleModal3"><i class="fas fa-redo"></i></button>
                        </div>
                        <div class="delete mobile">
                            <button class="btn btn-light" title="Close User Account" ng-click="crud(item,'delete')" data-toggle="modal" data-target="#exampleModal4">close</button>
                        </div>
                        <div><i class="fas fa-calendar-alt " title="Vendor History" ng-click="vendorhistory(item,'hist')" data-toggle="modal" data-target="#exampleModal6"></i></div>
                        <div><i class="fas fa-th-list " title="Vendor History" ng-click="vendorhistory(item,'logs')" data-toggle="modal" data-target="#exampleModal10"></i></div>
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
<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Revert</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body4">
                <div class="inputs">
                    <label for="name"><%register.username%> : <%register.status%></label>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Revert Credit</button>
        </div>
    </div>
</div>
</div>
<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">User Status</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body4">
                <div class="inputs">
                    <label for="name"><%register.username%> : <%register.status%></label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button ng-if="register.status=='ban'" type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Unban</button>
                <button ng-if="register.status=='unban'" type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Ban</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update User Password</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body3">
                <div class="inputs">
                    <div>
                        Reset Password <%register.name%>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Reset</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body4">
                <div class="inputs">
                    <label for="name"><%register.username%></label>
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
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add User Credit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body4">
                <div class="inputs">
                    <div>
                        <label for="name">Add <%register.type%></label>
                        <input type="number" placeholder="Add User Balance" ng-model="register.balance">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Add
                    <%register.type%></button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal6" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-content6">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">User Log</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body modal-body6">
                <div class="inputs">
                    <div class="name">User Name: <%register.name%></div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>From -> to</th>
                                <th>Created_at</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="item in histroy">
                                <div><%item.account%></div>
                                <div><%item.amount%></div>
                                <div><%item.description%></div>
                                <div><%item.frombalance%>/<%item.tobalance%></div>
                                <div><%item.created_at%></div>

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

<div class="modal fade" id="exampleModal10" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-content6">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">User Log</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body6">
                <div class="inputs">
                    <div class="name">User Name: <%register.name%></div>
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
                                <div><%key+1%></div>
                                <div><%name.username%></div>
                                <div><%item.log_date%></div>
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