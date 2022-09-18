import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { GameParams } from './../../@types/navigation'
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { useEffect, useState } from 'react'

import { styles } from './styles'
import logoImg from './../../assets/logo-nlw-esports.png'
import { THEME } from './../../theme'


import { Background } from './../../components/Background'
import { Heading } from './../../components/Heading'
import { DuoCard, DuoCardProps } from './../../components/DuoCard'

import { API_LINK } from './../../../env.ts'

export function Game() {
	const route = useRoute()
	const game = route.params as GameParams
	const navigation = useNavigation()
	const [ads, setAds] = useState<DuoCardProps[]>([])


	function handleGoBack() {
		navigation.goBack()
	}

	useEffect(() => {
    	fetch(`${API_LINK}/games/${game._id}/ads`).then(response => response.json()).then(data => setAds(data))
  	},[])

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo
							name="chevron-thin-left"
							color={THEME.COLORS.CAPTION_300}
							size={20}
						/>
					</TouchableOpacity>
					<Image 
						source={logoImg}
						style={styles.logo}
					/>
					<View style={styles.right}/>
				</View>
				<Image
					source={{uri: game.bannerURL}}
					style={styles.cover}
					resizeMode="cover"
				/>
				<Heading
					title={game.title}
					subtitle="Conecte-se e comece a jogar!"
				/>
				<FlatList
					data={ads}
					keyExtractor={item => item._id}
					renderItem={({item}) => {
						return <DuoCard key={item._id} data={item} onConnect={() => { }}/>
					}}
					horizontal
					contentContainerStyle={[ads.length > 0 ? styles.contentList : styles.emptyListContent]}
					showsHorizontalScrollIndicator={false}
					style={styles.containerList}

					ListEmptyComponent={() => {
						return (
								<Text style={styles.emptyListText}>
									Não há anúncios para este jogo no momento.
								</Text>
							)
					}}
				/>
			</SafeAreaView>
		</Background>
	)
}