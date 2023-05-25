import React, { useState } from 'react';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Header, Image, TextInput } from 'react-native';
import TextField from '../../components/Home/TextField.jsx'
import Modal from 'react-native-modal';
//import BottomSheet from '../../components/5sure-mobile/BottomSheet.tsx'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Constants from "expo-constants";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:3001`;