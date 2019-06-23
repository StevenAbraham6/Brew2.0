const xapi = require('xapi');

var teaVar = 0;
var greenTeaVar = 0;
var masalaChaiVar = 0;
var espressoVar=0;
var cafeLatteVar=0;
var cappuccinoVar=0;
var roomName;

function getName(name) {
 roomName=name
 console.log(roomName)
}


function makeZero(){
  xapi.command('UserInterface Extensions Widget SetValue', {
      WidgetId: "masala_chai_text",
      Value: 0
  })

  xapi.command('UserInterface Extensions Widget SetValue', {
      WidgetId: "tea_text",
      Value: 0
  })

  xapi.command('UserInterface Extensions Widget SetValue', {
      WidgetId: "green_tea_text",
      Value: 0
  })

  xapi.command('UserInterface Extensions Widget SetValue', {
      WidgetId: "latte_text",
      Value: 0
  })

  xapi.command('UserInterface Extensions Widget SetValue', {
      WidgetId: "cappucino_text",
      Value: 0
  })

  xapi.command('UserInterface Extensions Widget SetValue', {
      WidgetId: "espresso_text",
      Value: 0
  })
}

function deleteAll(){
  xapi.command('HttpClient Post', {
  'Header':'Content-Type: application/json',
  'Url': "http://159.89.164.250/v1/items/deleteall"},
  JSON.stringify({"roomName": roomName})).catch(e => console.error('Command error'));
}

xapi.status.get('UserInterface ContactInfo Name').then(getName)
makeZero()

//Calling the Concierge
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
   if (event.Type !== 'pressed') return
   if (event.WidgetId == 'callConcie'){
     //post with roomname
     console.log("Pressed toggle")
     xapi.command('HttpClient Post', {
    'Header':'Content-Type: application/json',
    'Url': "http://159.89.164.250/v1/items/toggle"},
    JSON.stringify({ "roomName": roomName})).catch(e => console.error('Command error'));
    }
})

//add a item
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.Type !== 'pressed') return
  console.log("Pressed add")

  var itemName="default";
  var itemText;
  var currValue;
  if (event.WidgetId == 'masala_chai_incr'){
    masalaChaiVar++
    itemName="masalaChai"
    itemText="masala_chai_text"
    currValue=masalaChaiVar;
  }

  if(event.WidgetId == "tea_incr"){
    teaVar++
    itemName="tea"
    itemText="tea_text"
    currValue=teaVar;
  }

  if(event.WidgetId == "green_tea_incr"){
    greenTeaVar++
    itemName="greenTea"
    itemText="green_tea_text"
    currValue=greenTeaVar;
  }

  if(event.WidgetId == "latte_incr"){
    cafeLatteVar++
    itemName="cafeLatte"
    itemText="latte_text"
    currValue=cafeLatteVar;
  }

  if(event.WidgetId == "capuccino_incr"){
    cappuccinoVar++
    itemName="cappuccino"
    itemText="cappucino_text"
    currValue=cappuccinoVar;
  }

  if(event.WidgetId == "espresso_incr"){
    espressoVar++
    itemName="espresso"
    itemText="espresso_text"
    currValue=espressoVar;
  }

  if(itemName!="default"){
    xapi.command('UserInterface Extensions Widget SetValue', {
      WidgetId: itemText,
      Value: currValue
    })


   xapi.command('HttpClient Post', {
    'Header':'Content-Type: application/json',
    'Url': "http://159.89.164.250/v1/items/add"},
    JSON.stringify({ "roomName": roomName, "itemName": itemName})).catch(e => console.error('Command error'));
  }


})


//minus a particular item
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
   if (event.Type !== 'pressed') return
   console.log("Reduce an item")

   var itemName="default";
   var itemText;
   var currValue;

   if (event.WidgetId == 'masala_chai_decr'){
      if(masalaChaiVar!=0){
        masalaChaiVar--
        itemName="masalaChai"
        itemText="masala_chai_text"
        currValue=masalaChaiVar;
     }
   }

   if (event.WidgetId == 'tea_decr'){
      if(teaVar!=0){
        teaVar--
        itemName="tea"
        itemText="tea_text"
        currValue=teaVar;
     }
   }

   if (event.WidgetId == 'green_tea_decr'){
      if(greenTeaVar!=0){
        greenTeaVar--
        itemName="greenTea"
        itemText="green_tea_text"
        currValue=greenTeaVar;
     }
   }

   if (event.WidgetId == 'latte_decr'){
      if(cafeLatteVar!=0){
        cafeLatteVar--
        itemName="cafeLatte"
        itemText="latte_text"
        currValue=cafeLatteVar;
     }
   }

   if (event.WidgetId == 'cappucino_decr'){
      if(cappuccinoVar!=0){
        cappuccinoVar--
        itemName="cappuccino"
        itemText="cappucino_text"
        currValue=cappuccinoVar;
     }
   }

   if (event.WidgetId == 'espresso_decr'){
      if(espressoVar!=0){
        espressoVar--
        itemName="espresso"
        itemText="espresso_text"
        currValue=espressoVar;
     }
   }

   if(itemName!="default"){
     xapi.command('UserInterface Extensions Widget SetValue', {
       WidgetId: itemText,
       Value: currValue
     })

    xapi.command('HttpClient Post', {
     'Header':'Content-Type: application/json',
     'Url': "http://159.89.164.250/v1/items/delete"},
     JSON.stringify({ "roomName": roomName, "itemName": itemName})).catch(e => console.error('Command error'));
   }

   if(masalaChaiVar==0&&greenTeaVar==0&&teaVar==0&&cafeLatteVar==0&&cappuccinoVar==0&&espressoVar==0)
   {
     makeZero();
     deleteAll();
   }
})




//close record
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.Type !== 'pressed') return
  if (event.WidgetId == 'delete'){

          //POST deleteALL
          xapi.command('HttpClient Post', {
          'Header':'Content-Type: application/json',
          'Url': "http://159.89.164.250/v1/items/deleteall"},
          JSON.stringify({ "roomName": roomName})).catch(e => console.error('Command error'));


          teaVar=greenTeaVar=masalaChaiVar=cafeLatteVar=espressoVar=cappuccinoVar=0;

          xapi.command('UserInterface Extensions Widget SetValue', {
            WidgetId: 'tea_text',
            Value: 0
          })

          xapi.command('UserInterface Extensions Widget SetValue', {
            WidgetId: 'masala_chai_text',
            Value: 0
          })

          xapi.command('UserInterface Extensions Widget SetValue', {
            WidgetId: 'green_tea_text',
            Value: 0
          })

          xapi.command('UserInterface Extensions Widget SetValue', {
            WidgetId: 'latte_text',
            Value: 0
          })

          xapi.command('UserInterface Extensions Widget SetValue', {
            WidgetId: 'cappucino_text',
            Value: 0
          })

          xapi.command('UserInterface Extensions Widget SetValue', {
            WidgetId: 'espresso_text',
            Value: 0
          })

      }});
