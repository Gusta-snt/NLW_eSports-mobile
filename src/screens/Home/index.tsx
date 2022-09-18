import { useEffect, useState } from 'react'
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png'

import { Heading } from '../../components/Heading'
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from './../../components/Background'

import { API_LINK } from './../../../env.ts'

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  function handleOpenGame({ _id, title, bannerURL}: GameCardProps) {
    navigation.navigate('game', { _id, title, bannerURL})
  }

  useEffect(() => {
    fetch(`${API_LINK}/games`).then(response => response.json()).then(data => setGames(data))
  },[])


  return (
    <Background>
      <SafeAreaView style={styles.container}>

        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...'/>

        <FlatList
          data={games}
          keyExtractor={item => item._id}
          renderItem={({item}) => { 
            return <GameCard key={item._id} data={item} onPress={() => handleOpenGame(item)}/>
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />

      </SafeAreaView>
      </Background>
  );
}