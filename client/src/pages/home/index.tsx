import { useSelector } from "react-redux"
import { List } from "../../components/list";
import { iStore } from "../../interfaces/interfaces"


export default function HomePage(){
    const robots = useSelector((store: iStore) => store.robots)
    return (
        <>
            <h1>Our last gen robots</h1>
            <List data={robots} />
        </>
    )
}