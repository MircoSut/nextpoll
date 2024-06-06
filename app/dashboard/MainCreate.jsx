"use client";
import React, { useState } from "react";

const MainCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, question, option1, option2, option3, option4 } =
      formData;

    try {
      const res = await fetch("/api/createpoll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          question,
          option1,
          option2,
          option3,
          option4,
        }),
      });

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
        });
        console.log("Poll created successfully");
      } else {
        console.error("Failed to create poll");
      }
    } catch (error) {
      console.error("Error, try again", error);
    }
  };

  return (
    <div>
      <section className="create-polls">
        <h1 className="text-center">Create Polls</h1>

        <form className="mx-auto" onSubmit={handleSubmit}>
          <div className="poll-information">
            <h4>
              <strong>Title</strong> (optional)
            </h4>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title of the poll"
              className="block mx-auto w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            />
            <h4>Description (optional)</h4>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description of the poll"
              rows="4"
              className="block mx-auto w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            ></textarea>
          </div>
          <div className="create">
            <h4 className="text-center mb-4">
              <strong>Choose your Question</strong>
            </h4>
            <input
              type="text"
              required
              id="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="What's your favourite food?"
              className="block mx-auto w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            />
            <div className="create-option">
              <p className="build__options">
                <strong>Option 1:</strong>
              </p>
              <input
                type="text"
                required
                id="option1"
                value={formData.option1}
                onChange={handleChange}
                placeholder="Pizza"
                className="block mx-auto w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="create-option">
              <p className="build__options">
                <strong>Option 2:</strong>
              </p>
              <input
                type="text"
                required
                id="option2"
                value={formData.option2}
                onChange={handleChange}
                placeholder="Sushi"
                className="block mx-auto w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="create-option">
              <p className="build__options">
                <strong>Option 3:</strong>
              </p>
              <input
                type="text"
                id="option3"
                value={formData.option3}
                onChange={handleChange}
                placeholder="Hamburger"
                className="block mx-auto w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="create-option">
              <p className="build__options">
                <strong>Option 4:</strong>
              </p>
              <input
                type="text"
                id="option4"
                value={formData.option4}
                onChange={handleChange}
                placeholder="Other"
                className="block mx-auto w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="create-poll-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MainCreate;
