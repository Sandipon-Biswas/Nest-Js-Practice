#include <iostream>
#include <bits/stdc++.h>
using namespace std;


void solve()
{

//start
string ss; getline(cin, ss);
transform(ss.begin(), ss.end(), ss.begin(), ::tolower);
string s="";
vector<pair<int,string>>v;

int idx=0;
for(int i=0;i<ss.size();i++){
    if( s.empty() ){
        s+=ss[i];
    }else{
        char a=s.back();
         if(ss[i]>a){s+=ss[i];}else{
        v.push_back(make_pair(idx,s));s.clear();s+=ss[i];idx=i;
    }
    }
}
v.push_back(make_pair(idx,s));
vector<int>w;
int m=0;
for(auto u:v){ if(u.second.size()>m)m=u.second.size(); }

string finalstring="";

for (auto u : v) {
    if (u.second.size() == m){ finalstring += u.second; w.push_back(u.first); }
}

int firstidx,lastidx;
if( w.size()==1){firstidx=w[0];lastidx=w[0]+m-1;}else{ firstidx=w[0];lastidx=w[w.size()-1]+m-1 ;}

cout<<finalstring<<endl;
cout<<firstidx<<endl;
cout<<lastidx<<endl;





}
// Main
int main()
{
      solve();
       
    return 0;
}
// End