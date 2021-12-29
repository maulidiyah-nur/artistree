type Tree<T> = T & {
    children: Array<T>
}

export default Tree
