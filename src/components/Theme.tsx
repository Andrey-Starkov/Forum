import React from 'react';
import ThemeData from "./ThemeData";


class Theme extends React.Component<{ topics: any }> {
    render() {
        let {topics} = this.props;
        let massive = [{id: 1, name: "2", theme: ""}]
        massive.pop()
        for (let i = 0; i < topics.length; i++) {
            massive.push(topics[i])
        }
        console.log(massive)
        return (
            <div>
                {
                    massive.map((t: any) => <div><ThemeData id={t.id} theme={t.theme} author={t.login}
                                                            time={t.createdAt}/></div>)}
            </div>
        );


    }
}

export default Theme;
