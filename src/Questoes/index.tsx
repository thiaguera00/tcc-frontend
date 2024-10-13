import React, { useState, FormEvent } from 'react';
import { gerarQuestaoIa } from '../services/iaService';

const GerarQuestao: React.FC = () => {
  const [level, setLevel] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data = await gerarQuestaoIa(level, content);
      setResult(data.questao);
    } catch (error) {
      console.error('Erro ao gerar questão', error);
    }
  };

  return (
    <div>
      <h2>Gerar Questão de Programação</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nível"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Gerar Questão</button>
      </form>
      {result && (
        <div>
          <h3>Questão Gerada:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default GerarQuestao;
