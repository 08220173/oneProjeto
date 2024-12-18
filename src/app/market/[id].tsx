import { Alert, Modal, View, StatusBar} from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { api } from "@/services/api";
import { useEffect, useState, useRef } from "react";
import { useCameraPermissions, CameraView } from "expo-camera";

import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";
import { ScrollView } from "react-native-gesture-handler";

type DataProps = PropsDetails & {
    cover: string
    category_id: string
}

export default function Market(){
    const params = useLocalSearchParams<{ id: string }>()
    const qrLock = useRef(false)
    const [ data, setData] = useState<DataProps>()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ coupon, setCoupon ] = useState<string | null>(null)
    const [ isVisibleCamaraModal, setIsVisibleCamaraModal ] = useState(false)
    const [ couponIsFetching, setCouponIsFetching ] = useState(false)
    const [_, requestPermission] = useCameraPermissions()

    async function fetchMarket() {
        try {
            const { data } = await api.get(`/markets/${params.id}`)        
            setData(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Não foi possível carregar os dados", [
                {
                    text: "Ok",
                    onPress: () => router.back(),
                },
            ])
        }
        
    }

    async function handleOpenCamera(){
        try {
            const {granted} = await requestPermission()
            if(!granted){
                return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera.")
            }

            setIsVisibleCamaraModal(true)
            qrLock.current = false
        } catch (error) {
            console.log(error)
            Alert.alert("Câmera", "Não foi possível utilizar a câmera")
        }
    }

    async function getCoupon(id: string) {
        try {
            setCouponIsFetching(true)
            const { data } = await api.patch(`/coupons/${id}`)
            Alert.alert("Cupom", data.coupon)
            setCoupon(data.coupon)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Não foi possível utilizar o cupom")
        } finally {
            setCouponIsFetching(false)
        }
        
    }

    function handleUseCoupon(id: string){
        setIsVisibleCamaraModal(false)
        Alert.alert(
            "Cupom", 
            "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
            [
                {style: "cancel", text: "Não" },
                {text: "Sim", onPress: () => getCoupon(id)}
            ]
        )
    }

    useEffect(() => {
        fetchMarket()
    }, [params.id, coupon])

    if(isLoading){
        return <Loading />
    }

    if(!data){
        return <Redirect href={"/home"} />
    }

    return <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={isVisibleCamaraModal} />
        <ScrollView showsVerticalScrollIndicator={false}>
            <Cover uri={data.cover}/>
            <Details data={data}/>
            {coupon && <Coupon code={coupon} />}
        </ScrollView>
        <View style={{padding: 32}}>
            <Button onPress={() => handleOpenCamera()}>
                <Button.Title>Ler QR Code</Button.Title>
            </Button>
        </View>

        <Modal style={{ flex: 1 }} visible={isVisibleCamaraModal}>
            <CameraView 
                style={{ flex: 1}} 
                facing="back"
                onBarcodeScanned={({ data }) => {
                    if(data && !qrLock.current){
                        qrLock.current = true
                        setTimeout(() => handleUseCoupon(data), 500)
                    }
                }}
            />

            <View style={{ position: "absolute", bottom: 32, left: 32, right:32 }}>
                <Button onPress={() => setIsVisibleCamaraModal(false)} isLoading={couponIsFetching}>
                    <Button.Title>Voltar</Button.Title>
                </Button>
            </View>
        </Modal>
    </View>
}