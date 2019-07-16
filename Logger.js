//logMode => 0 = log4js , 1=winston
function log(logMode,logFileType,logFileName,logLevel,maxFileSize,noOfBackups)
{
    try 
    {
        if (logMode==0) //log4js
        {
            const log4js=require('log4js');
            log4js.configure(
             {
               appenders: { Logger: { type: logFileType, filename: logFileName, maxLogSize: maxFileSize, backups : noOfBackups   } },
               categories: { default: { appenders: ['Logger'], level: logLevel } } // info or warn orr error
             });
               const logger = log4js.getLogger('Logger');
               logger.info('LOG4JS : Reading logger poperties from config file');
        }
        else //winston
         {
            const winston = require('winston');
            const logConfiguration =
            {
               'format' : winston.format.combine(
                   
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }),
                    winston.format.simple()
                ),
            
             'transports' : [
                 new winston.transports.File(
                     {
                         filename : logFileName,
                         maxFiles : 10, // maximum number of files allowed in mentioned folder
                         maxsize  : 1000000, // max file size, in bytes
                         level    : 'info' ,    
                         
                     }  )  ]
            }
        
            const logger = winston.createLogger(logConfiguration) ;   
        
            logger.info('WINSTON : Attempting to create log file using winston ...') ;
        
         }
        
    } 
    catch (error) 
    {
        console.log(error.message) ;   
    }
    console.log(`Log file has been created/updated in ${logFileName}`);
} 

module.exports.log=log;
