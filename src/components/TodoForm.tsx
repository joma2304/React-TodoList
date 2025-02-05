import "./TodoForm.css"
import { useState } from "react"

const TodoForm = () => {
    interface formData {
        title: string,
        description: string,
        status: string
    }

    interface ErrorsData {
        title?: string,
        description?: string
    }

    //States för formulär
    const [formData, setFormData] = useState<formData>({ title: "", description: "", status: "ej påbörjad" })
    const statusArr = ["påbörjad", "ej påbörjad", "avklarad"];

    //State för error
    const [errors, setErrors] = useState<ErrorsData>({})

    const validateForm = ((data: formData) => {

        const validationErrors: ErrorsData = {};

        if (!data.title) {
            validationErrors.title = "Fyll i titel på todo"
        }

        if (!data.description) {
            validationErrors.description = "Fyll i beskrivning av todo"
        }

        return validationErrors;
    })

    const submitForm = ((event: any) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            console.log("HELT KLART FEL")
        } else {
            setErrors({}); //Sätt fel till 0
            //Skicka data
            console.log("INGA FEL");
        }
    })

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