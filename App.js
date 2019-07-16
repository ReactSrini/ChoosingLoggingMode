//npm install log4js to install log4js
//npm i winston to install winston
// Reading properties for log file from Config.json
var config=require('./Config.json') ;
var logFileType  = config.logFileType ; // type="file"
var logLevel     = config.logLevel;
var maxFileSize  = config.maxLogSize ; //Max size allowed for log file , in bytes
var noOfBackups  = config.backups ; // number of backup files to be maintained

//Assigning logging file mode => 0=log4js 1=winston
var logMode = config.logMode; 

//Assiging currentdate as foldername, reading folder path and file name from config file
var dt = new Date();
var folderPath=config.folderPath;
logMode==0?folderPath+='/Log4JS' :folderPath+='/Winston'
var logFileName = `${folderPath}/${dt.getDate()}_${dt.getMonth()+1}_${dt.getFullYear()}/${config.logFileName}`;

//Passing properties to create log file through function
var logger=require('./Logger');
logger.log(logMode,logFileType,logFileName,logLevel,maxFileSize,noOfBackups)
