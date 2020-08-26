const { MrgLoop , Config } = require("mrgx");

const exec = async (program)=>{
    const configIns = new Config({program});
    const projectList = await configIns.getProjectList()
    let cmdArr = process.argv.map( function(arg){
        return "'" + arg.replace(/'/g, "'\\''") + "'";
      });
      
    const loop = new MrgLoop({lists:projectList});
    loop.loopCommand((`${cmdArr.slice(3).join(' ')}`))
}

module.exports.register = async (program)=>{
    program
    .command("exec <command>")
    .description("do same action to list in config")
    .allowUnknownOption()
    .action(async command => {
      await exec(program);
    });
}
