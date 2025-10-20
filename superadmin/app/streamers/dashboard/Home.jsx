const Component = () => {
    return (
        <div>
            {items.map(item => <Item key={item.id} item={item} />)}
        </div>
    );
}; 