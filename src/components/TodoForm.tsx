import "./TodoForm.css"
import { useState } from "react"

const TodoForm = () => {
    //Interface för formulärets data
    interface formData {
        title: string,
        description: string,
        status: string
    }
    //Interface för Errordata
    interface ErrorsData {
        title?: string,
        description?: string
    }

    //States för formulär
    const [formData, setFormData] = useState<formData>({ title: "", description: "", status: "Ej påbörjad" })
    const statusArr = ["Pågående", "Ej påbörjad", "Avklarad"];

    //State för error
    const [errors, setErrors] = useState<ErrorsData>({})

    const validateForm = ((data: formData) => {

        const validationErrors: ErrorsData = {};

        if (data.title.length < 3) { //Måste vara minst 3 bokstäver
            validationErrors.title = "Titel på todo måste vara minst 3 bokstäver"
        }

        if (data.description.length > 200) { //Valfri, max 200 tecken
            validationErrors.description = "Fyll i beskrivning av todo (max 200 tecken)"
        }

        return validationErrors;
    })

    const submitForm = async (event: any) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) { //Ifall validation innehåller fel
            setErrors(validationErrors);
            return;
        }

        setErrors({}); // Rensa felmeddelanden

        if (!formData.title || !formData.description || !formData.status) {
            console.error("Fel: Alla fält måste vara ifyllda!", formData);
            return;
        }
        //Ifall validation är ok
        try {
            const res = await fetch("https://moment2-api.onrender.com/todos", { //Anrop till API
                method: "POST", //POST för att lägga till
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            //IFall res inte är ok
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Fel från servern:", errorData);
                throw new Error("Misslyckades med att skicka data");
            }

        } catch (error) {
            console.error("Fel vid skickande av data", error);
        }
    };



    return (
        <>
            <form onSubmit={submitForm}>
                <label htmlFor="title">Att göra</label>
                {errors.title && <span className="error-container">{errors.title}</span>}
                <input type="text" name="title" id="title" value={formData.title}
                    onChange={(event) => setFormData({ ...formData, title: event.target.value })} />

                <label htmlFor="description">Beskrivning</label>
                {errors.description && <span className="error-container">{errors.description}</span>}
                <input type="text" name="description" id="description" value={formData.description}
                    onChange={(event) => setFormData({ ...formData, description: event.target.value })} />

                <label htmlFor="status">Status</label>
                <select name="status" id="status" value={formData.status}
                    onChange={(event) => setFormData({ ...formData, status: event.target.value })}>
                    {
                        statusArr.map((status, index) => (
                            <option key={index}>{status}</option>
                        )
                        )

                    }
                </select>
                <input type="submit" value="Lägg till todo" />
            </form>
        </>
    )
}

export default TodoForm