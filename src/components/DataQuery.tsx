import React, {FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";


//import {useQuery} from "@tanstack/react-query";



type Result = {
    userId: string;
    id: string;
    title: string;
    body: string;
} | undefined;

type User = {
    id: string,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
} | undefined;



const URL = "https://jsonplaceholder.typicode.com/";


const getPostById = async (id: string,url: string): Promise<Result> => {
    const request = await fetch(`${URL}${url}/${id}`);
    return await request.json();
};

const getUserById = async (id: string, url: string): Promise<User> => {
    const request = await fetch(`${URL}${url}/${id}`);
    return await request.json();
};

function usePost(postId: string) {
    return useQuery(
        ["post", postId],
        () => getPostById(postId,"posts"),
        {enabled: !!postId}
    );
}

function usePostUser(postId: string) {
    return useQuery(
        ["post2", postId],
        () => getUserById(postId,"users"),
        {enabled: !!postId}
    );
}



export default function DataQuery() {
    const [id, setId] = useState("");
    const [input, setInput] = useState("");
    const {data: personal,error: personalerror, } = usePostUser(id);
    const {data, error} = usePost(id);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setId(input);

    };



    return <form onSubmit={handleSubmit}>
        <label>
            ID:
            <input type="text" value={id} onChange={e => setId(e.target.value)}/>
            <br/>
        </label>
        {personal && <div>
            <h3>Name: {personal.name}</h3>
            <h3>Email: {personal.email}</h3>
        </div>}
        {data && <div>
            <h3>Title: {data.title}</h3>
            <h3>Description: {data?.body}</h3>
        </div>}
        <p/>
        <Link to={"/"}> Обратно </Link>
        <p/>
        <Link to={"/fetch"}> Запрос(fetch) </Link>
    </form>;
}
