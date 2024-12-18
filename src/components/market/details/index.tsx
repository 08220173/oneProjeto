import { View, Text } from "react-native";
import { IconPhone, IconMapPin, IconTicket, } from "@tabler/icons-react-native";

import { s } from "./style";
import { Info } from "../info";
import { colors } from "@/styles/colors";
import { categoriesIcons } from "@/utils/categories-icons";

export type PropsDetails = {
    name: string
    description: string
    address: string
    phone: string
    coupons: number
    categoryId: string
    rules: {
        id: string
        description: string
    }[]
}

type Props = {
    data: PropsDetails
}

export function Details({ data }: Props){
    const Icon = categoriesIcons[data.categoryId]
    return (
        <View style={s.container}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={s.name}>{data.name}</Text>
                <Icon size={22} color={colors.green.base}/>
            </View>
            <Text style={s.description}>{data.description}</Text>

            <View style={s.cupons}>
                <IconTicket color={colors.red.base} size={24}/>
                <Text style={s.cuponsNum}>{data.coupons}</Text>
                <Text style={s.cuponsText}>cupons disponíveis</Text>
            </View>
            <View style={s.group}>
                <Text style={s.title}>Regulamento</Text>
                {data.rules.map((item) => (
                    <View key={item.id} style={s.rule}>
                        <Text style={s.ruleDot}>{`\u2022`}</Text>
                        <Text style={s.ruleText}>{item.description}</Text>
                    </View>
                ))}
            </View>
            <View style={s.group}>
                <Text style={s.title}>Informações</Text>
                <Info icon={IconMapPin} description={data.address} />
                <Info icon={IconPhone} description={data.phone} />
            </View>
        </View>
    )
}