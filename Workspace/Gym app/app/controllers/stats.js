var args = arguments[0] || {};

// Create a window and view for stats
var statsWin = Titanium.UI.createWindow({
    backgroundColor: '#F2F2F2',
    layout:'vertical',
    title: 'Statistics'
});

var statsView = Titanium.UI.createView({
    left:'0dp',
    width:'100%'
});

var total_weight = 0;
var total_workouts = 0;

var data = args.db.execute('SELECT * FROM stats');

if (data.isValidRow())
{
	total_weight = data.fieldByName('weight');
	total_workouts = data.fieldByName('workouts');
}

data.close();

var label1 = Titanium.UI.createLabel({
    text:'Total weight lifted: ' + total_weight,
    color: 'black',
    left: 10,
    top: 10,
    height: 30
});

var label2 = Titanium.UI.createLabel({
    text:'Total number of workouts: ' + total_workouts,
    color: 'black',
    left: 10,
    top: 50,
    height: 30
});

statsView.add(label1);
statsView.add(label2);
statsWin.add(statsView);
statsWin.open();
