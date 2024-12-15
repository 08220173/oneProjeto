import { Text, useWindowDimensions } from "react-native";
import { PlaceProps } from "../place";
import BottomSheet,  { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { useRef } from "react";

import { Place } from "../place";
import { s } from "./style";


type Props = {
    data: PlaceProps[]
}

export function Places({ data }: Props){
    const dimensions = useWindowDimensions()
    const bootomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = {
        min: 278,
        max: dimensions.height - 128
    }
    return(
        <BottomSheet
            ref={bootomSheetRef}
            snapPoints={[snapPoints.min, snapPoints.max]}
            handleIndicatorStyle={s.indicator}
            backgroundStyle={s.container}
            enableOverDrag={false}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Place data={item} />}
                contentContainerStyle={s.content}
                ListHeaderComponent={() => (
                    <Text style={s.title}>Explore locais perto de você</Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </BottomSheet>
    )
}