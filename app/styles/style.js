import {
    StyleSheet
} from 'react-native';
import { material, materialColors, iOSColors, systemWeights } from "react-native-typography";
import platform from '../native-base-theme/variables/platform';
import {heightPercentageToDP as hp, widthPercentageToDP as wp, widthPercentageToDP} from 'react-native-responsive-screen'
export default StyleSheet.create({
    //Auth Page
    centerVerticalContainer: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        paddingHorizontal: '5%',
        width: '100%'
    },
    input:{
        marginRight: 5,
        marginVertical: '2%',
        borderRadius: 10
    },
    //Home
    //Section Component
    headerText: {
        ...material.subheadingObject,
        ...systemWeights.semibold,
        borderBottomColor: platform.brandPrimary,
        borderBottomWidth: 7.5,
        paddingRight: 20,
        paddingVertical: 5,
        paddingLeft: 10
    },
    homeSection:{
        marginBottom: 5
    },
    homeCard:{
        width: 120,
        elevation: 5,
        padding: 1,
        // borderRadius: 10
    },
    homeCardBig: {
        width: 150,
        elevation: 5,
        padding: 1,
        // borderRadius: 10
    },
    homeCardItem:{
        borderRadius: 10
    },
    homeCardBG:{
        height: null, 
        width: null, 
        flex: 1, 
        justifyContent: 'flex-end',
        borderRadius: 10
    },
    homeCardImage: {
        minHeight: 175,
        maxHeight: 200,
        width: null,
        flex: 1,
        justifyContent: 'flex-end',
        // borderRadius: 10
    },
    homeCardContent:{
        marginTop: 50,
        backgroundColor: '#2228',
        padding: 5
    },
    homeCardContentBrief:{
        backgroundColor: '#222A',
        padding: 5
    },
    homeCardContentBig: {
        marginTop: 100,
        backgroundColor: '#2225',
        padding: 5
    },
    homeCardTitle:{
        ...material.buttonWhite,
        // color: materialColors.blackSecondary,
        marginVertical: 1
    },
    homeCardSubtitle:{
        ...material.captionWhite,
        color: materialColors.whiteSecondary,
        marginVertical: 2
    },
    homeCardButton:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Profile styles
    imgBackground:{
        height: hp('55%'),
        width: wp('100%'),
        // backgroundColor: '#222',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    infoRow:{
        backgroundColor: platform.brandInfo,
        paddingHorizontal: wp('7.5%'),
        paddingVertical: 20
    },
    infoSubRow:{
        marginVertical: 7.5
    },
    infoRowIcon:{//The Icon container
        width: 50, 
        borderRightColor: materialColors.whiteTertiary, 
        borderRightWidth: 0.5, 
        justifyContent: "center", 
        alignItems: 'center', 
        paddingRight: 20,
        paddingVertical: 5
    },
    infoIcon:{//The icon itself
        color: platform.brandLight,
        fontWeight: '100',
    },
    infoRowText:{// The text container
        paddingLeft: 20,
        justifyContent: 'center',
        paddingVertical: 5
    },
    infoText:{//The text itself
        ...material.headlineWhiteObject,
        ...systemWeights.thin
    },
    infoSubText: { //The text itself
        ...material.subheadingWhiteObject,
        ...systemWeights.light
    },
    //Book style
    AudioButtonCont:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    AudioButton:{

    },
    //Library
    libContainer:{
        paddingHorizontal: 5
    }
});
