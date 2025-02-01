import React from 'react';

const Chatbot: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-2xl font-bold">Good To See You Again!</h1>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Everything about Python</h2>
          <ul className="list-disc list-inside">
            <li>Python data types</li>
            <li>What is python?</li>
            <li>Loops in python</li>
            <li>Operations in python</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Three-Level Schema Architecture</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">External Level:</h3>
              <p>Represents the user's view of the database.</p>
              <ul className="list-disc list-inside ml-4">
                <li>It defines how specific users or user groups see the data.</li>
                <li>Different users can have customized views (subsets or derived data) based on their needs.</li>
                <li>Example: A salesperson sees customer data with only name, address, and purchase history, while the finance team sees credit limits and payment records.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold">Conceptual Level:</h3>
              <p>Represents the logical structure of the entire database.</p>
              <ul className="list-disc list-inside ml-4">
                <li>Focuses on entities, relationships, and constraints without considering how the data is stored.</li>
                <li>Acts as a bridge between the external and internal levels.</li>
                <li>Example: A schema that defines tables, columns, data types, and relationships in a normalized form.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 p-4 rounded-b-lg">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-lg border border-gray-300"
        />
      </footer>
    </div>
  );
};

export default Chatbot;