const log = {
    info:function(info){
        console.log('Info'+info)
    },
    warning : function(warning){
        console.log('Warning'+warning);
    },
    error:function(error){
        console.log('error'+error);
    }
}

module.exports = log