import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 10,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButton: {
        marginTop: 40,
        backgroundColor: '#000',
    },
    createButton: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        borderColor: '#000',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    buttonTextDark: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    registerScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    registerContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    registerLogo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#000',
    },
    registerTabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    registertabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    registeractiveTabButton: {
        borderBottomColor: '#000',
    },
    registertabText: {
        fontSize: 16,
        color: '#aaa',
    },
    registeractiveTabText: {
        color: '#000',
        fontWeight: 'bold',
    },
    registerinputContainer: {
        marginBottom: 15,
    },
    registerlabel: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
    },
    registerinput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
    },
    registersmallInput: {
        flex: 1,
        marginHorizontal: 5,
    },
    registerrow: {
        flexDirection: 'row',
    },
    registertermsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    registertermsText: {
        marginLeft: 5,
        color: '#555',
    },
    registerbutton: {
        backgroundColor: '#000',
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 12,
        marginVertical: 10,
    },
    registerbuttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orRegisterWithText: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#555',
    },
    registersocialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    registerfooterText: {
        textAlign: 'center',
        color: '#555',
        marginTop: 10,
    },
    registerfooterLink: {
        fontWeight: 'bold',
        color: '#000',
    },
    loginScreenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loginLogo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginVertical: 20,
    },
    loginTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 20,
    },
    loginInputContainer: {
        marginBottom: 15,
    },
    loginLabel: {
        fontSize: 14,
        marginBottom: 5,
    },
    loginInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    loginInput: {
        flex: 1,
        height: 45,
    },
    loginForgotPassword: {
        alignSelf: 'flex-end',
        marginVertical: 10,
    },
    loginForgotText: {
        fontSize: 12,
        color: '#888',
    },
    loginButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 15,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginOrText: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#aaa',
    },
    loginSocialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    loginFooterText: {
        textAlign: 'center',
        color: '#888',
    },
    loginFooterLink: {
        color: '#000',
        fontWeight: 'bold',
    },
    interestContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
      },
      interestHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      interestBackArrow: {
        fontSize: 20,
        color: '#333',
      },
      interestSkipButton: {
        fontSize: 16,
        color: 'black',
      },
      interestTitle: {
        marginTop: 10,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
      },
      interestSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
      },
      interestScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      interestButton: {
        backgroundColor: '#fff',
        borderColor: '#333',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
      },
      interestButtonText: {
        fontSize: 14,
        color: '#333',
      },
      interestContinueButton: {
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        height: 50,
        justifyContent: 'center'
      },
      interestContinueButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
      questionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
      },
      questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
      },
      questionbuttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
      },
      answerButton: {
        backgroundColor: '#efefef',
        padding: 15,
        borderRadius: 10,
        margin: 5,
      },
      answerText: {
        fontSize: 16,
        color: '#333',
      },
      questionCounter: {
        fontSize: 14,
        marginTop: 20,
        color: '#666',
      },
      testContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      testTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      testResultType: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4F4F4F',
      },
      testResultSubType: {
        fontSize: 18,
        color: '#888',
      },
      testIntro: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 15,
      },
      testButtonPrimary: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
      },
      testButtonSecondary: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
      },
      testButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      testButtonTextSecond: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });

export default styles;
