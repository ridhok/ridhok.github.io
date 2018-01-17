/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Facebook = {
    
     /*====== configuration ===================================================*/ 
        
    appId: FBAppID, // r123 new
    //appId: "269506653077661", //r123 pro
    message_userRejection: "You must allow this permissions to use this application.",
    permission_list: ['public_profile','email','user_birthday','user_about_me','user_location','user_website','user_work_history','user_hometown'],
    graph_fields: ['id','email','name','gender','first_name','last_name'],
    
    /*=======================================================================*/  
}

window.fbAsyncInit = function() {     
    
    if (typeof(FB) != 'undefined' && FB != null ) {
        // init the FB JS SDK
        FB.init({
            appId : Facebook.appId,
            xfbml : true,
            version : 'v2.4'
        });        
    }
    if(typeof(FB) != 'undefined' && FB != null && isDebugFB) console.log(FB);
    
    console.log("Facebook: Starting Facebook SDK...");
    
    //overwrite this===========================================
    Facebook.onEnteredPlatform = function(uid,access_token){}

    Facebook.onUserRejectAuth = function(){
        //alert(Facebook.message_userRejection);
    }
    //===============================================================
    
    Facebook.setAppId = function(appId){
        Facebook.appId = appId;
    }
    
    Facebook.getAppId = function(){
        return Facebook.appId;
    }
    
    Facebook.getGraphFields = function(){
        return Facebook.graph_fields.join();
    }
    
    Facebook.checkPublishPermission = function(callback){
        console.log("Facebook: checking permision...");
        FB.api('/me/permissions', function (response) {

            var permissions = Facebook.permission_list;
            var returnValue = true;
            //console.log(response);
            //console.log(permissions);
            var found = false;
            /*for(var i in permissions){		
                console.log("checking permission: " + permissions[i]);		
                for(var j in response.data){
                    if(response.data[j].permission == permissions[i]){
                        found = true;
                        console.log("found permission: " + permissions[i] +" value: " + response.data[j].status);
                        if(response.data[j].status !== "granted"){
                            returnValue = false;
                            //console.log('break 1');
                            break;
                        }
                        //console.log('break 2');
                        break;
                    }else{
                        //found = false;
                    }
                }		
                if(!found){
                    returnValue = false;
                    //console.log('break 3');
                    break;
                }			
            }*/
            callback(returnValue);                                        
        });
    }
    
    Facebook.showLoginFB = function(){
        //console.log("Facebook: showing FB Dialog");
        console.log("FB Permissions:"+Facebook.permission_list.join());
        FB.login(function(response) {
            if (response.authResponse) {    
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;

                Facebook.fbid = uid;
                Facebook.access_token = accessToken;

                Facebook.checkPublishPermission(function(check){
                    if(check){
                        Facebook.onEnteredPlatform(uid,accessToken);
                    }else{
                        Facebook.onUserRejectAuth();
                        Facebook.showLoginFB();
                    } 
                });
            } else {                                
                Facebook.onUserRejectAuth();
            }        
        },{scope: Facebook.permission_list.join()});        
    }

    Facebook.login = function(){
        //console.log("Facebook: getting status...");
        FB.getLoginStatus(function(response) {
            console.log('login status:');
            console.log(response);

            if (response.status === 'connected') {
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;

                console.log("Facebook: connected with uid: " + uid);

                Facebook.fbid = uid;
                Facebook.access_token = accessToken;

                Facebook.checkPublishPermission(function(check){
                    if(check){
                        Facebook.onEnteredPlatform(uid,accessToken);  
                    }else{
                        Facebook.showLoginFB();
                    }   
                });

            } else if (response.status === 'not_authorized') {
                console.log("Facebook: not authorized yet");
                Facebook.showLoginFB();
            } else {
                console.log("Facebook: not logged yet");
                Facebook.showLoginFB();
            }
        });
    }   
}

// Load the SDK asynchronously
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
