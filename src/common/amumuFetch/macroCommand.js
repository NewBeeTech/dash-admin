export function MicroCommand() {
  this.result = null;
  this.params = null;
  this.commandList = [];
}

// 添加命令
MicroCommand.prototype.add = function (command) {
  this.commandList.push(command);
};

// 执行宏命令
MicroCommand.prototype.excute = function () {
  for (var i = 0, command; command = this.commandList[i++];) {
    const result = command.excute(command.params);
    command.result = result;
  }
};

// TODO: 串行执行
// TODO: 并行执行
