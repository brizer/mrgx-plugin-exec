# mrgx-plugin-exec

exec plugin for mrgx


## Usage


First, make sure that `mrgx` was installed in global:

``` bash
npm i mrgx -g
```

Then install the plugin which is starting with `mrgx-plugin-` such as `mrgx-plugin-exec`:

``` bash
npm i mrgx-plugin-exec -g
```

use it:

```
mrgx exec npm install
```

or

``` 
mrgx exec ls -l
```



## Main Logic

The main logic of it is:


``` js
const { MrgLoop , Config } = require("mrgx");

const exec = async (command)=>{
    //Get configuration
    const configIns = new Config();
    //Get the list of projects activated in the current configuration
    const projectList = await configIns.getProjectList()
    let cmdArr = process.argv.map( function(arg){
        return "'" + arg.replace(/'/g, "'\\''") + "'";
      });
    // Multi-process execution queue
    const loop = new MrgLoop({lists:projectList});
    // Execution commands in all paths
    loop.loopCommand((`${cmdArr.slice(3).join(' ')}`))
}
// provide a register method
module.exports.register = async (program)=>{
    //Registration and configuration of sub-commands for the syntax of commander
    program
    .command("exec <command>")
    .description("do same action to list in config")
    .allowUnknownOption()
    .action(async command => {
      await exec(command);
    });
}

```
