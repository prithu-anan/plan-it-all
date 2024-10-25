import React, { useEffect, useState } from 'react';
import { getRoutes, login, signup } from '../api-helpers';
import { useNavigate } from 'react-router-dom';

const history = () => {
  const navigate = useNavigate();


  return (
    <section className="relative w-full h-screen mx-auto pt-56">
        <div className="max-w-lg mx-auto bg-tertiary p-8 rounded-lg shadow-md items-center">
            <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Travel Log</h2>
        </div>
    </section>
  );
};

export default history;
