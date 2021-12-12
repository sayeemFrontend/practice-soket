export const scrollBottom = (event) => {

    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
        //scrollbar in bottom
        //   ......action will be implemetedt
        return true
    }
    else return false
};