
def dropCourse(graph, course):
    nodes = graph['nodes']
    edges = graph['edges']

    for node in nodes:
        if node['id'].lower() == course.lower():
            node['color'] = 'black'
            for edge in edges:
                if edge['from'].lower() == course.lower():
                    edge['color'] = 'black'
                    graph = dropCourse(graph, edge['to'])

    return graph

