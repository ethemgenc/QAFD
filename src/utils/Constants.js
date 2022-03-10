import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const colors = {
    primary: '#d3d342',//'#2196f3',
    secondary: '#d3d342',
    border: '#e2e2e2',
    white: '#fff',
    black: '#000000',
    red: '#f44336',
    pink: '#e91e63',
    green: '#4caf50',
    grey: '#adb5bd',
    background: '#161615',
    hintBorder: '#ffffff',
    hintBackground: '#f44336',
    hintAvatarLabel: '#d3d342',
}

export const SIZES = {
    base: 10,
    width,
    height,
}