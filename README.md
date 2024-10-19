# todo
A simple to-do list app.

## Running
`todo` is written in React with the help of Vite, so install required dependencies with the packager of your choice (`npm install`, `yarn` or what have you) and run the `dev` command (`npm run dev`, `yarn dev`) to start up a server with the app in development mode.

## Usage

Use the plus button at the top to add new tasks.

To mark a task as done click the check button. It will be removed from the list in 5 seconds (unless you stop the process by clicking once again in that timeframe) and registered as a "Done" task. To remove a task without marking it as done, use the trashcan button.

Click on the name of a task to begin changing its name and click outside of it or press Enter to finish.

Tasks may be divided into subtasks. To add one, use the encircled plus button—likewise, to remove one, use the trashcan button. A parent task may not be marked as done until all of its subtasks are marked as done, but it may be removed anyway.

## Possible improvements
* The interface feels super clunky, some animation (e.g. `div.animated` from `react-spring`) couldn't hurt.

* On a similar note, tasks (and subtasks) could be drag-and-droppable to enable changing their order.

* I have mixed feelings about the placement of the plus button but I couldn't settle on a less worse place to put it.

* Responsive with respect to mobile on a very minimal level. The mobile interface could be greatly more suited to the limitations of its viewport.

* The "Done" window is kind of ugly. (Not surprising since it was a last-minute idea.) We could work on it.

* It's possible that "double-click in 5 seconds to remove/mark as done" is a more efficient and comfortable manner of handling things than "click and wait 5 seconds to remove/mark as done". Maybe it's subjective though? In any case reworking this wouldn't be hard.

* On the code side, the `Task` component is kind of bulky. Maybe it could be tidied up and broken up into smaller pieces a little.

* CSS was written in a stream-of-consciousness manner. It should probably be tidied up too.