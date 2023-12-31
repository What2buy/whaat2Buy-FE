import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, QueryPlaceHolderStore, useQueryActions, useMessagesActions } from 'store';
import { PrefixIcon } from './prefix';
import * as S from './styles';
import { QueryPlaceHolder } from 'constant/texts';

const Input = () => {
  const query = useQuery();
  const { setQuery } = useQueryActions();
  const { idx, setPlaceHolderIdx } = QueryPlaceHolderStore();
  const { addInitialMessage } = useMessagesActions();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('페이지 이동', query);
    addInitialMessage(query);
    navigate(`/list?query=${query}`);
  };

  useEffect(() => {
    const interval = setInterval(() => setPlaceHolderIdx(), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };
  return (
    <>
      <div className={S.QueryLayout}>
        <form className={S.FormContainer} onSubmit={handleSubmit}>
          <div className={S.InputContainer}>
            <PrefixIcon />
            <input
              className={S.InputWrapper}
              placeholder={QueryPlaceHolder[idx]}
              name="query"
              role="getInitialDemandQuery"
              onChange={handleQueryChange}
              value={query}
            />
          </div>

          <button className={S.Button} type="submit">
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default Input;
