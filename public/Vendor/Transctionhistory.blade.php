<header>
    <div class="topbar-left">
        <button class="menu-bar" ng-click="toggleMenu()"><i class="fas fa-bars"></i></button>
        <p class="logo">
            <i class="fas fa-angle-left"></i><i class="fas fa-angle-left"></i>
            <span> Renonights</span> <i class="fas fa-angle-right"></i><i class="fas fa-angle-right"></i>
        </p>

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
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>From -> to</th>
                        <th>Balance Change</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="(key,item) in pagedItems[currentPage]| filter:test">
                        <td class="user-id">
                            <span><%item.account%></span><i class="fas fa-copy"></i>
                        </td>
                        <td class="name"><span ng-class="{deposit:'deposit', redeem:'redeem', withdrawal:'withdrawal'}[item.description]"><%item.amount%></span></td>
                        <td class="name"><span ng-class="{deposit:'deposit2', redeem:'redeem2', withdrawal:'withdrawal2'}[item.description]"><%item.description%></span></td>
                        <td class="name"><%item.from%>/<%item.to%></td>
                        <td class="credit"><span><%item.frombalance%></span>/<span><%item.tobalance%></span> </td>
                        <td class="name"><span><%item.created_at%></span></td>
                    </tr>
                </tbody>
            </table>
            <div class="tablenew">
                <div class="tablehead">
                    <div>Account</div>
                    <div>Amount</div>
                    <div>Description</div>
                    <th></th>
                    <div></div>
                </div>
                <div class="tablebody" ng-repeat="(key,item) in pagedItems[currentPage] | filter:test">
                    <div class="tablebody1">
                        <div class="user-id">
                            <span ng-click="copyToClipboard(item.username);"><%item.account%></span>
                        </div>
                        <!--<i class="fas fa-copy"></i>-->
                        <div class="name" ng-class="{deposit:'deposit', redeem:'redeem', withdrawal:'withdrawal'}[item.description]"><%item.amount%></div>
                        <div class="name" ng-class="{deposit:'deposit2', redeem:'redeem2', withdrawal:'withdrawal2'}[item.description]"><%item.description%></div>
                        <div><i class="fas fa-ellipsis-v" ng-model="item.id" ng-click="item.id?item.id=false:item.id=true"></i></div>
                    </div>
                    <div class="tableaction" ng-if="!item.id">
                        <div class="name"><%item.from%>/<%item.to%></div>
                        <div class="name"><span><%item.frombalance%></span>/<span><%item.tobalance%></span></div>
                        <div class="name"><%item.created_at%></div>
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
                <h5 class="modal-title" id="exampleModalLabel">Create New User</h5>
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
                        <input type="text" id="password" placeholder="password" ng-model="register.username"
                            disabled="disabled">
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
                <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
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
                <h5 class="modal-title" id="exampleModalLabel">Update User Password</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body3">
                <div class="inputs">
                    <div>
                        Reset Password
                        <label for="password"><%register.name%></label>

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
<div class="modal fade" id="exampleModal7" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
<div class="modal fade" id="exampleModal5" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add User Credit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body5">
                <div class="inputs">
                    <div>
                        <label for="name">Add Credit</label>
                        <input type="text" placeholder="Add User Balance" ng-model="register.balance">
                    </div>
                    <div>
                        <label for="name">Add Remarks</label>
                        <input type="text" placeholder="Add User Balance" ng-model="register.detail">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Add
                    Balance</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal8" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Revert User Credit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body5">
                <div class="inputs">
                    <div>
                        <label for="name">Revert Amount</label>
                        <input type="text" placeholder="Deduct User Credit" ng-model="register.balance">
                    </div>
                    <div>
                        <label for="name">Add Remarks</label>
                        <input type="text" placeholder="Add Detail" ng-model="register.detail">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Deduct
                    Credit</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal9" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Withdrawl User Credit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-body5">
                <div class="inputs">
                    <div>
                        <label for="name">Withdrawl Credit</label>
                        <input type="text" placeholder="Deduct User Credit" ng-model="register.balance">
                    </div>
                    <div>
                        <label for="name">Add Remarks</label>
                        <input type="text" placeholder="Add Detail" ng-model="register.detail">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="registervendro()">Deduct
                    Credit</button>
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
                                <th>Userid</th>
                                <th>Transction Amount</th>
                                <th>Transction Type</th>
                                <th>Transction note</th>
                                <th>Transction Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="item in histroy">
                                <td><%item.userid%></td>
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