import React from 'react';
import { SafeAreaView } from 'react-native'; 
import { Button } from 'react-native-paper';

const AuthenticateScreen = () => {
    return (
       <SafeAreaView>
           <Button>
               Authenticate
           </Button>
       </SafeAreaView> 
    );
}

export default AuthenticateScreen;