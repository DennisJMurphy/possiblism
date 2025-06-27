import { useEffect, useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { supabase } from '../lib/supabase'
import { router } from 'expo-router'
import Constants from 'expo-constants' // dev only, delete for production

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

 // dev only, delete for production
  useEffect(() => {
  const loginUser = Constants.expoConfig?.extra?.DEVMAIL
  const loginPass = Constants.expoConfig?.extra?.DEVPASS
  // console.log('Using dev credentials:', loginUser, loginPass)
  if (loginUser && loginPass){
    setEmail(loginUser)
    setPassword(loginPass)
    setMessage('Using dev credentials, please change before production!')
  }
  }, [])
 
    const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else {
        setMessage('Logged in!')
        router.replace('/(tabs)')
    }
  }

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Check your email for a confirmation link!')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text>Email</Text>
      <TextInput
        autoCapitalize='none'
        placeholder='email@example.com'
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Text>Password</Text>
      <TextInput
        placeholder='password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title='Sign In' onPress={handleLogin} />
      <Button title='Sign Up' onPress={handleSignup} />
      {message && <Text style={{ marginTop: 20 }}>{message}</Text>}
    </View>
  )
}
