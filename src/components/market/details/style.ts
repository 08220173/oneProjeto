import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme"


export const s = StyleSheet.create({
    container: {
        padding: 32,
        paddingBottom: 0,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        backgroundColor: colors.gray[100],
    },
    name: {
        fontSize: 20,
        fontFamily: fontFamily.bold,
        color: colors.gray[600],
        marginRight: 10,
    },
    description: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        color: colors.gray[500],
        marginTop: 12,
        marginBottom: 15,
        lineHeight: 22,
    },
    group: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[200],
        paddingBottom: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 14,
        fontFamily: fontFamily.medium,
        color: colors.gray[500],
        marginBottom: 12,
    },
    cupons: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.red.light,
        borderRadius: 10,
        marginBottom: 15,
    },
    cuponsNum: {
        paddingLeft: 10,
        fontFamily: fontFamily.bold,
    },
    cuponsText: {
        paddingLeft: 5,
        fontFamily:fontFamily.regular,
    },
    rule: {
        flexDirection: "row",
        alignItems: "center",
    },
    ruleDot: {
        color: colors.gray[500],
        marginRight: 10,
        fontFamily: fontFamily.bold,
    },
    ruleText: {
        color: colors.gray[500],
        fontFamily: fontFamily.regular,
    },
})