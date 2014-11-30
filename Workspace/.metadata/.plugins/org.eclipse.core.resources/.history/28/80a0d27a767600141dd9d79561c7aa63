// get the arguments that were passed in.
var args = arguments[0] || {};

// create a view and window
if (typeof formsWin == 'undefined' ) 
{
	var formsWin = Titanium.UI.createWindow({
	    backgroundColor: '#F2F2F2',
	    layout:'vertical',
	    title: args.title
	});
}
else
{
	formsWin.open();
}
var formsview = Titanium.UI.createScrollView({
    scrollType:"vertical",
    left:'0dp',
    width:'100%'
});

// for keeping track of the forms
var forms = [];

// for keeping track of the submit button
var submit_button = null;

// query the database to know what forms need to be created
var chosen = args.db.execute("SELECT * FROM list where name = ?", args.title);

// delete any previous forms
for (i = 0; i < forms.length; i++)
{
	formsview.remove(forms[i]);
}

// variables for creating the froms
var p = 0;
var options = ['time', 'sets', 'reps', 'weight'];

// create the necessary forms
for (z = 0; z < options.length; z++)
{
	if (chosen.fieldByName(options[z]) == 1)
	{
		var field = Ti.UI.createTextField({
			keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
			color: '#336699',
			hintText: options[z],
			height: 35,
			top: 10 + 45 * p,
			width: '100%',
		});
		forms.push(field);
		formsview.add(field);
		p++;
	}
}

// remove an already existing submit button if there is one
if (submit_button != null)
{
	formsview.remove(submit_button);
}

// create a submit button
var submit = $.UI.create('Button', {
   top: 10 + p * 45,
   title: 'Submit',
   id: "button"
});

// keep track of the button
submit_button = submit;

// add an event listener for the submit button
submit.addEventListener('click', function (e) {
	
	// check if all forms have been filled
	var not_filled = false;
	for (i = 0; i < forms.length; i++)
	{
		if (forms[i].getValue() == '')
		{
			alert("All fields aren't filled");
			not_filled = true;
		}
	}
	
	// if all forms have been filled
	if (not_filled == false)
	{
		// make a new workout if one has not been made yet
		var check = args.db.execute('SELECT * FROM workout_info WHERE workout_id = ?', args.workout_id);
		if(!check.isValidRow())
		{
			args.db.execute('INSERT INTO workouts (id) values (?)', args.workout_id);
		}
		// dynamically create the query for adding an exercise
		var query = "INSERT INTO workout_info (exercise, workout_id, ";
		for (i = 0; i < forms.length; i++)
		{
			query = query.concat(forms[i].hintText);
			if (i+1 != forms.length)
			{
				query = query.concat(", ");
			}
		}
		query = query.concat(") VALUES (");
		query = query.concat("'" + args.title + "'");
		query = query.concat(", ");
		query = query.concat(args.workout_id);
		query = query.concat(", ");
		for (i = 0; i < forms.length; i++)
		{
			query = query.concat(forms[i].getValue());
			if (i+1 != forms.length)
			{
				query = query.concat(", ");
			}
		}
		query = query.concat(")");
		
		// run the query
		args.db.execute(query);
		
		// return to the muscle groups view
		formsWin.close();
		args.exercisesWin.close();
	}
});

// add the submit button to the view
formsview.add(submit);

// close the queryd info
chosen.close();

// add the view to the window and open the window
formsWin.add(formsview);
formsWin.open();
