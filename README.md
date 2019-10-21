# software-engineering-project
Code, written reports, and other deliverables for SWE Group 3

# Git Workflows

Our main branch is master. DO NOT commit to master. Our backup branch is STABLE. DO NOT commit to STABLE. Breanna will periodically migrate stable snapshots of master to STABLE.

This assumes you are using git bash. If you use git GUIs, you're on your own for figuring that out.

To work on a task, go to the master branch first with:
```
git checkout master
```

Run the following command to make sure you have no modified files, unstaged files, or commits not pushed:
```
git status
```

Create a new branch for your project with the command (without the bent brackets):
```
git branch <my-branch-name>
```

Move to your branch with
```
git checkout <my-branch-name>
```

Make your changes to the files as needed. After you changed your files, use the command below. Use '*' to add all files or run git status again and copy and paste the relative paths to the specific files you which to version control for everyone.
```
git add *
```

After you run git add, write a commit message using (please put a meaningful message in your commit! tell me what you changed and why)
```
git commit -m "commit message detailing the changes"
```

Continuing making commits until you changed all the code that needs to be fixed. When you are done, push your branch using
```
git push
```

If there have been changes to master, you can pull that into your branch with the command below. If there are merge conflicts, you must resolve them. I prefer using p4merge as a gui using 'git mergetool -t p4merge' (this requires additional set up not described here).
```
git pull "origin" master
```

Do some testing and make sure 100% super duper that your code is perfect. Once it's done, move it to the main branch with the following commands:
```
git checkout master
git merge <my-branch-name>
git push
```


# Style Guide

## Views
All view js file should start with a captial letter, camel-case, and contain the word "View" at the end.

## Javascript/JQuery
app.html should contain the script tags referencing every js file initialized in the app. It's not pretty and it'll take a performance hit, but this is an easier solution than finding a real depenency manager for now.

# Dev FAQ & Guide

## How is MVC implemented?
Our single page application (SPA) uses app.js as the router for the pages. All this means is that page must supply a url and a html file for the router to navigate to a page inside the application.

The Model and Controller haven't been made yet. Our "viewer" is not one view, but instead, multiple views. Each page has its own viewer. Currently, only HomePageView.js has been started. You'll see it's url is '/', which means going to the url '/' from any button on the app will show the home page. The template 'templates/home.html' is the ui shown. While not yet complete, the view will mainly consist of event listeners for ui interactions like button clicks and key presses. For more info on attaching event handlers in JQuery, see https://www.w3schools.com/jquery/event_on.asp

Use HomePageView as an example for viewers. To add another view, make sure the "class" contains the public variables 'url' and 'template', and instatiate an instance of the View in the init function of DecentralizedFitness.js. Add a button somewhere that links to your new url, and 

## How do I deploy this?
If you serve the HTML locally, Chrome will fight with you because it thinks you are under attack of a rouge application. One solution is to use Microsoft Edge, because appearently it ignores that threat. Another solution (this is what Breanna uses), is to host a local server on your localhost using WAMP (Windows only), and deploy the app from there using any browser. The WAMP solution includes a MySQL database, which may be helpful. Note that this will only work for Windows, but I'm sure Linux and Mac have plenty of alternatives.

Additonally, you could host everything on 000webhost.com, and that would include everything. Our final demos will be hosted there.
