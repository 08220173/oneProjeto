import { Stack } from "expo-router"
import { colors } from "@/styles/theme"

import { 
    useFonts,
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold   
} from "@expo-google-fonts/rubik"

import { Loading } from "@/components/loading"

export default function Layout(){
    const [carregouFontes] = useFonts({
        Rubik_600SemiBold,
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_700Bold 
    })

    if(!carregouFontes) {
        return <Loading />
    }

    return <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: colors.gray[100]},
    }} />
}