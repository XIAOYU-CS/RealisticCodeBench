#include <string>
#include <unordered_map>

class TrieNode {
public:
    std::unordered_map<char, TrieNode*> children;
    bool is_end_of_word;

    TrieNode();
    ~TrieNode();

    bool has_child(char ch);
    TrieNode* get_child(char ch);
    void add_child(char ch);
    void set_end_of_word();
    bool is_end() const;
};

class Trie {
public:
    TrieNode* root;

    Trie();
    ~Trie();

    void insert(const std::string& word);
    bool search(const std::string& word);
    bool starts_with(const std::string& prefix);
};
