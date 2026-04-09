import { useState, useEffect } from "react";

const Koodinimi = () => {
    const [koodinimi, setKoodinimi] = useState<string>("");

    useEffect(() => {
        let name = localStorage.getItem("koodinimi");

        if (name == null) {
            const adjectives = ["Kiva", "Iloinen", "Hassu", "Suloinen", "Reilu"];
            const animals = ["Leijona", "Kissa", "Hamsteri", "Marsupilami", "Majava"];

            const randomAdj =
                adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomAnimal =
                animals[Math.floor(Math.random() * animals.length)];
            const randomNumber = Math.floor(Math.random() * 100);

            name = randomAdj + randomAnimal + randomNumber;

            localStorage.setItem("koodinimi", name);
        }

        setKoodinimi(name);
    }, []);

    return (
        <div>
            <h2>Koodinimesi on:</h2>
            <p>{koodinimi}</p>
        </div>
    );
};

export default Koodinimi;