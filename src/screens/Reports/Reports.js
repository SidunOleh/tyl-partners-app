import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import Dropdown from "../../components/UI/Select"
import DateRange from "../../components/UI/DateRange"
import { formatYMD } from "../../utils/utils"
import OrdersService from "../../services/OrdersService"
import Statistic from "../../components/Reports/Statistic"
import ProductsList from "../../components/Reports/Products/List"

export default function ReportsScreen() {
    const options = [{
        label: "День",
        value: "day",
    }, {
        label: "Тиждень",
        value: "week",
    }, {
        label: "Місяць",
        value: "month",
    }, {
        label: "Вказати діапазон",
        value: "custom",
    }]
    const [ selectedOption, setSelectedOption ] = useState("day")
    const [ range, setRange ] = useState([null, null])
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        const start = new Date()
        const end = new Date()

        if (selectedOption == "day") {
            setRange([
                formatYMD(start),
                formatYMD(end)
            ])
        }

        if (selectedOption == "week") {
            start.setDate(new Date().getDate() - 7)
            setRange([
                formatYMD(start),
                formatYMD(end)
            ])
        }

        if (selectedOption == "month") {
            start.setMonth(new Date().getMonth() - 1)
            setRange([
                formatYMD(start),
                formatYMD(end)
            ])
        }
    }, [selectedOption])

    useEffect(() => {
        getData()
    }, [range])

    const getData = async () => {
        if (! range[0] || ! range[1]) {
            return
        }

        setLoading(true)
        const res = await OrdersService.getStatistic(range[0], range[1])
        setLoading(false)

        if (res.success) {
            setData(res.statistic)
        }
    }

    return (
        <View style={[styles.container]}>
            <View style={[styles.top]}>
                <Dropdown 
                    options={options} 
                    selectedValue={selectedOption} 
                    onValueChange={setSelectedOption}/>

                {selectedOption == "custom" && <DateRange value={range} setValue={setRange}/>}
            </View>

            {loading && <View style={styles.refreshIndicator}>
                <ActivityIndicator size="small" color={'#EC1220'} />
            </View>}
            
            <View style={[styles.bottom]}>
                <Statistic data={data}/>

                <ProductsList items={data?.products ?? []}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
    },
    top: {
        paddingHorizontal: 16,
        gap: 10,
    },  
    bottom: {
        gap: 16,
        flex: 1,
    },
    refreshIndicator: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})