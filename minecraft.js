const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 1000;
let splashes=''

app.use(express.static('public'))
app.use(express.json());

app.listen(PORT, ()=>{
  console.log(`Server running on por ${PORT}`)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res){ 
  res.send(`
        <html><head></head><body><textarea placeholder="minecraft splashes" value="${splashes}" id="text" style="margin: 0px; height: 610px; width: 287px;"></textarea><br><input type="button" id="go" value="go"><script>
        document.getElementById('text').value=localStorage.getItem('splash')
        document.getElementById('go').onclick=function(){
            localStorage.setItem('splash',document.getElementById('text').value)
            let stuff = {
                stuff:document.getElementById('text').value
            }

            var xhr = new window.XMLHttpRequest()
            xhr.open('POST', '/', true)
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
            xhr.send(JSON.stringify(stuff))

        }
        </script></body></html>
  `)
})

app.post('/', function(req, res){
    splashes=req.body.stuff
    fs.writeFile('Library/Application Support/minecraft/resourcepacks/Custom-Splashes/assets/minecraft/texts/splashes.txt', req.body.stuff, function (err) {
        if (err) throw err;
    });
})
