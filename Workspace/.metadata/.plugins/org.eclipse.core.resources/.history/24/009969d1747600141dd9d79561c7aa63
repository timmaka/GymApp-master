// clear built in database
var Tdb = Ti.Database.open ('_alloy_');
Tdb.execute ('DROP TABLE IF EXISTS workouts');
Tdb.close ();

// create a window and view for muscle groups
var indexWin = Titanium.UI.createWindow({
    backgroundColor:'#F2F2F2',
    layout:'vertical',
    title: 'Gym App'
});

var indexView = Titanium.UI.createScrollView({
    scrollType:"vertical",
    left:'0dp',
    width:'100%'
});

var newBut = $.UI.create('Button', {
    top: 10,
    title: 'New Workout',
    id: 'button'
});

newBut.addEventListener('click', function(e) {
	newWorkout();
});

var continueBut = $.UI.create('Button', {
    top: 10,
    title: 'Continue Workout',
    id: 'button'
});

continueBut.addEventListener('click', function(e) {
	resume();
});

var pastBut = $.UI.create('Button', {
    top: 70,
    title: 'Past Workouts',
    id: 'button'
});

pastBut.addEventListener('click', function(e) {
	pastWorkouts();
});

var addBut = $.UI.create('Button', {
    top: 130,
    title: 'Add exercise',
    id: 'button'
});

addBut.addEventListener('click', function(e) {
	addexercise();
});

var endBut = $.UI.create('Button', {
    top: 190,
    title: 'End Workout',
    id: 'button'
});

endBut.addEventListener('click', function(e) {
	end_workout();
});
// open the database
var db = Ti.Database.install('/database.db', 'gymdatabase');

// get the last workout id if the last workout was started within 2 and a half hours
var workout_id;
var last_id = db.execute('SELECT * FROM current');
if (last_id.isValidRow())
{
	var start = db.execute('SELECT timestamp from workouts where id = ?', last_id.fieldByName('current_workout'));
	if (start.isValidRow())
	{
		var difference = db.execute("SELECT strftime('%s', datetime('now', 'localtime')) - strftime('%s',?) as diff", start.fieldByName('timestamp'));
		if (difference.fieldByName('diff') <= 9000)
		{
			workout_id = last_id.fieldByName('current_workout');
		}
	}	
}
	
function newWorkout (e)
{

	// get the last workouts id
	var workout_info = db.execute('SELECT id FROM workouts ORDER BY id DESC LIMIT 1');
	
    // set an id for the new workout
	if (workout_info.isValidRow())
	{
		workout_id = workout_info.fieldByName('id') + 1;	
	}
	else
	{
		workout_id = 1;
	}
	
	// update the database
	db.execute('DELETE FROM current');
	db.execute('INSERT INTO current (current_workout) VALUES (?)', workout_id);
	var last_id = db.execute('SELECT * FROM current');
	
	// open the select window passing the database into it
	var selectWin = Alloy.createController('select', {db:db, workout_id: workout_id}).getView(); 
	
	// modify the main screen
	indexView.remove(newBut);
	indexView.add(continueBut);
	indexView.add(endBut);
}

function resume (e)
{
	if (typeof workout_id == 'undefined')
	{
		alert ("You haven't started a workout yet!");
	}
	else
	{
		// open the select window passing the database into it
		var selectWin = Alloy.createController('select', {db:db, workout_id: workout_id}).getView(); 
	}
}

function pastWorkouts (e)
{
	var pastView = Alloy.createController('past', {db:db}).getView();
}

function addexercise (e)
{
	var addView = Alloy.createController('add', {db:db}).getView();
}

function end_workout (e)
{
	db.execute('DELETE FROM current');
	indexView.remove(continueBut);
	indexView.add(newBut);
	indexView.remove(endBut);
}

indexView.add(pastBut);
indexView.add(addBut);

if (typeof workout_id == 'undefined')
{
	indexView.add(newBut);
}
else
{
	indexView.add(continueBut);
	indexView.add(endBut);
}

Ti.App.addEventListener('workout_ended', function(e){
	end_workout();
});

// open the index window
indexWin.add(indexView);
indexWin.open();
