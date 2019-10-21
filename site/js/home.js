// html served to create this page
let home = `
<div id="rootHome" class="appPageRoot">
    <!-- navigation based on github repo mentioned here https://medium.com/altcampus/implementing-simple-spa-routing-using-vanilla-javascript-53abe399bf3c -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#" onclick="onNavigate('/'); return false;">Decentralized Fitness</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#" onclick="onNavigate('/'); return false;">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Devices</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Reminders</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Goals</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Reminders</a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li> -->
            </ul>
        </div>
    </nav>

    <div id="homePageContainer">
        <div id="homePageUserSideBar">
            profile
            pic
            username
            bio
            settings
            logout
        </div>
        <div class="container" id="homePageActionsContainer">
            <div class="col" id="homeActionsPanel">
                <div id="homeQuickActionsCont">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="card homePageActionCard" style="width: 18rem;">
                                    <img class="card-img-top" src="..." alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">Quick Stats</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card homePageActionCard" style="width: 18rem;">
                                    <img class="card-img-top" src="..." alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">Add Data</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                        <div class="w-100"></div>
                            <div class="col">
                                <div class="card homePageActionCard" style="width: 18rem;">
                                    <img class="card-img-top" src="..." alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">Community Highlights</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card homePageActionCard" style="width: 18rem;">
                                    <img class="card-img-top" src="..." alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">Quick Goal Progress</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`