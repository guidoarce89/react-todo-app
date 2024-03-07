import './TodoLoading.css';

function TodoLoading() {
  return (
    <div className="TodoLoading-container">
      <span className="TodoLoading-completeIcon"></span>
      <p className="TodoLoading-text"></p>
      <span className="TodoLoading-deleteIcon"></span>
    </div>
  );
}

export { TodoLoading };