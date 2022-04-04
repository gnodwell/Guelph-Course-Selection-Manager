
def dropCourse(graph, course):
    nodes = graph['nodes']
    edges = graph['edges']

    #loop nodes
    for node in nodes:
        #if course is a node in the graph, change it's color to black
        if node['id'].lower() == course.lower():
            node['color'] = 'black'
            #loop edges
            for edge in edges:
                #if course node connects to another node, change edge color to black
                if edge['from'].lower() == course.lower():
                    edge['color'] = 'black'
                    #recurse
                    graph = dropCourse(graph, edge['to'])

    return graph

